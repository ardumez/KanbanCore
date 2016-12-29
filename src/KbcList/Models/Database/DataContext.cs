using Microsoft.EntityFrameworkCore;
using KbcList.Models.BoardModels;
using System.Linq;

namespace KbcList.Models.Database
{
    public interface IDataContext
    {

        void AddEntity<TEntity>(TEntity entity) where TEntity : class;
        IQueryable<TEntity> Query<TEntity>() where TEntity : class;
    }

    public class DataContext : DbContext, IDataContext
    {
        public DbSet<Board> Boards { get; set; }


        public DataContext(DbContextOptions<DataContext> options)  
            : base(options)
        {

        }
        public void AddEntity<TEntity>(TEntity entity) where TEntity : class
        {
            base.Add<TEntity>(entity);
        }

        public IQueryable<TEntity> Query<TEntity>() where TEntity : class
        {
            return base.Set<TEntity>();
        }

    }
}