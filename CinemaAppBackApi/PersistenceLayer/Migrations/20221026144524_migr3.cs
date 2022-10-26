using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PersistenceLayer.Migrations
{
    public partial class migr3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Genre_Movie_movieId",
                table: "Genre");

            migrationBuilder.DropIndex(
                name: "IX_Genre_movieId",
                table: "Genre");

            migrationBuilder.DropColumn(
                name: "movieId",
                table: "Genre");

            migrationBuilder.CreateTable(
                name: "GenreMovie",
                columns: table => new
                {
                    GenresgenreId = table.Column<long>(type: "bigint", nullable: false),
                    MoviesmovieId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenreMovie", x => new { x.GenresgenreId, x.MoviesmovieId });
                    table.ForeignKey(
                        name: "FK_GenreMovie_Genre_GenresgenreId",
                        column: x => x.GenresgenreId,
                        principalTable: "Genre",
                        principalColumn: "genreId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GenreMovie_Movie_MoviesmovieId",
                        column: x => x.MoviesmovieId,
                        principalTable: "Movie",
                        principalColumn: "movieId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GenreMovie_MoviesmovieId",
                table: "GenreMovie",
                column: "MoviesmovieId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GenreMovie");

            migrationBuilder.AddColumn<long>(
                name: "movieId",
                table: "Genre",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Genre_movieId",
                table: "Genre",
                column: "movieId");

            migrationBuilder.AddForeignKey(
                name: "FK_Genre_Movie_movieId",
                table: "Genre",
                column: "movieId",
                principalTable: "Movie",
                principalColumn: "movieId");
        }
    }
}
