using Microsoft.EntityFrameworkCore.Migrations;

namespace EventsApp.API.Data.Migrations
{
    public partial class AddedIsDeleteColumnToPublicationsAndSharesTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "PublicationId",
                table: "Shares",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Shares",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Publications",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Shares");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Publications");

            migrationBuilder.AlterColumn<int>(
                name: "PublicationId",
                table: "Shares",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
