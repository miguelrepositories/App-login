using ApiCapotariaBatista.Data;
using ApiCapotariaBatista.Dtos;
using ApiCapotariaBatista.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using NetDevPack.Identity.Jwt;
using NetDevPack.Identity.Model;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Capotaria Batista API",
        Description = "Developed by Avanaiccenture <3"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Insira o token JWT desta maneira: Bearer {seu token}",
        Name = "Authorization",
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddIdentityEntityFrameworkContextConfiguration(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
    b => b.MigrationsAssembly("ApiCapotariaBatista")));

builder.Services.AddIdentityConfiguration();
builder.Services.AddJwtConfiguration(builder.Configuration, "AppSettings");

builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
    {
        builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
    }
));

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", policy => policy.RequireClaim("admin"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("corsapp");
app.UseAuthConfiguration();
app.UseHttpsRedirection();

#region User

app.MapPost("/register", [AllowAnonymous] async (SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager, IOptions<AppJwtSettings> appJwtSettings, RegisterUser registerUser) =>
{
    if (registerUser == null)
        return Results.BadRequest("Usuário não informado");

    var user = new IdentityUser
    {
        UserName = registerUser.Email,
        Email = registerUser.Email,
        EmailConfirmed = true
    };

    var result = await userManager.CreateAsync(user, registerUser.Password);

    if (!result.Succeeded)
        return Results.BadRequest(result.Errors);

    var jwt = new JwtBuilder()
                .WithUserManager(userManager)
                .WithJwtSettings(appJwtSettings.Value)
                .WithEmail(user.Email)
                .WithJwtClaims()
                .WithUserClaims()
                .WithUserRoles()
                .BuildUserResponse();

    return Results.Ok(jwt);

})
.WithName("RegisterUser")
.WithTags("User");

app.MapPost("/login", [AllowAnonymous] async (SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager, IOptions<AppJwtSettings> appJwtSettings, LoginUser loginUser) =>
{
    if (loginUser == null)
        return Results.BadRequest("Usuário não informado");

    var result = await signInManager.PasswordSignInAsync(loginUser.Email, loginUser.Password, false, true);

    if (result.IsLockedOut)
        return Results.BadRequest("Usuário bloqueado");

    if (!result.Succeeded)
        return Results.BadRequest("Usuário ou senha inválidos");

    var jwt = new JwtBuilder()
                .WithUserManager(userManager)
                .WithJwtSettings(appJwtSettings.Value)
                .WithEmail(loginUser.Email)
                .WithJwtClaims()
                .WithUserClaims()
                .WithUserRoles()
                .BuildUserResponse();

    return Results.Ok(jwt);

})
.WithName("LoginUser")
.WithTags("User");

#endregion

#region Client

app.MapGet("/client", [Authorize] async (AppDbContext context) => await context.Clients.ToListAsync())
.RequireAuthorization("Admin")
.WithName("GetAllClient")
.WithTags("Client");

app.MapGet("/client/{id}", [Authorize] async (int id, AppDbContext context) => 
    await context.Clients.FindAsync(id) is Client client ? Results.Ok(client) : Results.NotFound())
.RequireAuthorization("Admin")
.WithName("GetClientById")
.WithTags("Client");

app.MapPost("/client", [Authorize] async (AppDbContext context, Client client) =>
{
    context.Clients.Add(client);
    var result = await context.SaveChangesAsync();
    return result > 0
            ? Results.CreatedAtRoute("GetClientById", new { id = client.Id }, client)
            : Results.BadRequest("Houve um problema ao salvar o registro");
})
.RequireAuthorization("Admin")
.WithName("CreateClient")
.WithTags("Client");


app.MapPut("/client/{id}", [Authorize] async (int id, AppDbContext context, Client client) =>
{
    var oldClient = await context.Clients.FindAsync(id);

    if (oldClient == null) return Results.NotFound();

    oldClient.Name = client.Name;
    oldClient.Email = client.Email;
    oldClient.PhoneNumber = client.PhoneNumber;
    oldClient.Document = client.Document;

    context.Clients.Update(oldClient);
    var result = await context.SaveChangesAsync();

    return result > 0
        ? Results.NoContent()
        : Results.BadRequest("Houve um problema ao salvar o registro");

})
.RequireAuthorization("Admin")
.WithName("UpdateClient")
.WithTags("Client");

app.MapDelete("/client/{id}", [Authorize] async (int id, AppDbContext context) =>
{
    var client = await context.Clients.FindAsync(id);

    if (client == null) return Results.NotFound();

    context.Clients.Remove(client);
    var result = await context.SaveChangesAsync();

    return result > 0
        ? Results.NoContent()
        : Results.BadRequest("Houve um problema ao salvar o registro");

})
.RequireAuthorization("Admin")
.WithName("DeleteClient")
.WithTags("Client");

#endregion

#region Order
app.MapGet("/order", [Authorize] async (AppDbContext context) => await context.Orders.Include(x => x.Client).ToListAsync())
.RequireAuthorization("Admin")
.WithName("GetAllOrders")
.WithTags("Order");

app.MapGet("/order/{orderNumber}", async (string orderNumber, AppDbContext context) =>
    await context.Orders.Include(x => x.Client).FirstOrDefaultAsync(x => x.OrderNumber == orderNumber) is Order order ? Results.Ok(order) : Results.NotFound())
.WithName("GetOrderByOrderNumber")
.WithTags("Order");

app.MapPost("/order", [Authorize] async (AppDbContext context, Order order) =>
{
    context.Orders.Add(order);
    var result = await context.SaveChangesAsync();
    return result > 0
            ? Results.CreatedAtRoute("GetClientById", new { id = order.Id }, order)
            : Results.BadRequest("Houve um problema ao salvar o registro");
})
.RequireAuthorization("Admin")
.WithName("CreateOrder")
.WithTags("Order");


app.MapPut("/order/{id}", [Authorize] async (int id, AppDbContext context, UpdateOrderDto order) =>
{
    var oldOrder = await context.Orders.FindAsync(id);

    if (oldOrder == null) return Results.NotFound();

    oldOrder.Description = order.Description;
    oldOrder.DeliveryForecast = order.DeliveryForecast;
    oldOrder.OrderStatus = order.OrderStatus;

    context.Orders.Update(oldOrder);
    var result = await context.SaveChangesAsync();

    return result > 0
        ? Results.NoContent()
        : Results.BadRequest("Houve um problema ao salvar o registro");

})
.RequireAuthorization("Admin")
.WithName("UpdateOrder")
.WithTags("Order");

app.MapDelete("/order/{id}", [Authorize] async (int id, AppDbContext context) =>
{
    var order = await context.Orders.FindAsync(id);

    if (order == null) return Results.NotFound();

    context.Orders.Remove(order);
    var result = await context.SaveChangesAsync();

    return result > 0
        ? Results.NoContent()
        : Results.BadRequest("Houve um problema ao salvar o registro");

})
.RequireAuthorization("Admin")
.WithName("DeleteOrder")
.WithTags("Order");
#endregion

app.Run();