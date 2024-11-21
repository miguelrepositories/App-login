using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiCapotariaBatista.Migrations
{
    public partial class AddDocumentInClient : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Document",
                table: "Clients",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Document",
                table: "Clients");
        }
    }
}
