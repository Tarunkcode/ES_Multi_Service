using System;
using es_url_shortner.data_access.Model.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace excellentsoftwares_short_url.app.Migrations
{
    public partial class url_shortnerContext : DbContext
    {
        public url_shortnerContext()
        {
        }

        public url_shortnerContext(DbContextOptions<url_shortnerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<LinksDatum> LinksData { get; set; }
        public DbSet<QR> QRCodesUri { get; set; }
        public DbSet<User> UserTable { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("server=103.25.128.155, 2499;Database=url_shortner;User ID=sa;Password=ASwe5#nhTS;Trusted_Connection=True;TrustServerCertificate=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");
            modelBuilder.Entity<User>(entity => {
                entity.ToTable("user_table");
                entity.Property(e => e.srno).HasColumnName("srno");
                entity.Property(e => e.userId).HasColumnName("userId").IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.uName).HasColumnName("uName").IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.email).HasColumnName("email")
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.phoneNo).HasColumnName("phoneNo")
                    .HasMaxLength(12)
                    .IsUnicode(false);
                entity.Property(e => e.password).HasColumnName("password")
                  .HasMaxLength(30)
                  .IsUnicode(false);
                 entity.Property(e => e.isCaptchaEnable).HasColumnName("isCaptchaEnable")
          
                  .IsUnicode(false);

            });
            //modelBuilder.Entity<LinksDatum>(entity =>
            //{
            //    entity.HasKey(e => e.LinkId)
            //        .HasName("PK__links_da__93B0078CDF0AE3EF");

            //    entity.ToTable("links_data");

            //    entity.Property(e => e.LinkId).HasColumnName("link_id");

            //    entity.Property(e => e.DestinationUrl)
            //        .HasMaxLength(500)
            //        .IsUnicode(false)
            //        .HasColumnName("destination_url");

            //    entity.Property(e => e.DomainUrl)
            //        .IsRequired()
            //        .HasMaxLength(60)
            //        .IsUnicode(false)
            //        .HasColumnName("domain_url");

            //    entity.Property(e => e.Name)
            //        .IsRequired()
            //        .HasMaxLength(30)
            //        .IsUnicode(false)
            //        .HasColumnName("name");

            //    entity.Property(e => e.Path)
            //        .IsRequired()
            //        .HasMaxLength(50)
            //        .IsUnicode(false)
            //        .HasColumnName("path");
            //});

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
