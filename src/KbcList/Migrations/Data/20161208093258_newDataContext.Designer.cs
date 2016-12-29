using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using KbcList.Models.Database;

namespace KbcList.Migrations.Data
{
    [DbContext(typeof(DataContext))]
    [Migration("20161208093258_newDataContext")]
    partial class newDataContext
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("KbcList.Models.BoardModels.Board", b =>
                {
                    b.Property<int>("BoardID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BoardName");

                    b.HasKey("BoardID");

                    b.ToTable("Boards");
                });
        }
    }
}
