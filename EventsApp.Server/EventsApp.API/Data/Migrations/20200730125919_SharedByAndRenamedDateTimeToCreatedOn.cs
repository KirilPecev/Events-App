using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EventsApp.API.Data.Migrations
{
    public partial class SharedByAndRenamedDateTimeToCreatedOn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Publications_Type_Enum_Constraint",
                table: "Publications");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Friends_Status_Enum_Constraint",
                table: "Friends");

            migrationBuilder.DropCheckConstraint(
                name: "CK_AspNetUsers_Gender_Enum_Constraint",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DateTime",
                table: "Shares");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Shares");

            migrationBuilder.DropColumn(
                name: "DateTime",
                table: "Publications");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Publications",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "SharedById",
                table: "Publications",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Publications_SharedById",
                table: "Publications",
                column: "SharedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Publications_AspNetUsers_SharedById",
                table: "Publications",
                column: "SharedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Publications_AspNetUsers_SharedById",
                table: "Publications");

            migrationBuilder.DropIndex(
                name: "IX_Publications_SharedById",
                table: "Publications");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Publications");

            migrationBuilder.DropColumn(
                name: "SharedById",
                table: "Publications");

            migrationBuilder.CreateCheckConstraint(
                name: "CK_Publications_Type_Enum_Constraint",
                table: "Publications",
                sql: "[Type] IN(0, 1)");

            migrationBuilder.CreateCheckConstraint(
                name: "CK_Friends_Status_Enum_Constraint",
                table: "Friends",
                sql: "[Status] IN(1, 2)");

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

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Shares",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateTime",
                table: "Publications",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
