using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EventsApp.API.Data.Migrations
{
    public partial class AddedDateTimeToPublicationAndShareTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_AspNetUsers_Gender_Enum_Constraint",
                table: "AspNetUsers");

            migrationBuilder.CreateCheckConstraint(
                name: "CK_AspNetUsers_Gender_Enum_Constraint",
                table: "AspNetUsers",
                sql: "[Gender] IN(1, 2)");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateTime",
                table: "Shares",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateTime",
                table: "Publications",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_AspNetUsers_Gender_Enum_Constraint",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DateTime",
                table: "Shares");

            migrationBuilder.DropColumn(
                name: "DateTime",
                table: "Publications");

            migrationBuilder.CreateCheckConstraint(
                name: "CK_AspNetUsers_Gender_Enum_Constraint",
                table: "AspNetUsers",
                sql: "[Gender] IN(0, 1, 2)");
        }
    }
}
