using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiCapotariaBatista.Migrations
{
    public partial class UpdateClassificationToTypeProduction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Classification",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "TypeProduction",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TypeProduction",
                table: "Orders");

            migrationBuilder.AddColumn<string>(
                name: "Classification",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
