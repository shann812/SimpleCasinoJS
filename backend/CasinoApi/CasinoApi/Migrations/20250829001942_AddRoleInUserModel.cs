using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CasinoApi.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleInUserModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Verification",
                table: "Users",
                newName: "Verificated");

            migrationBuilder.AddColumn<int>(
                name: "Role",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Verificated",
                table: "Users",
                newName: "Verification");
        }
    }
}
