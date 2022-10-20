﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Contract_Interface
{
    public interface IRepository<TEntity> where TEntity : class
    {

        IEnumerable<TEntity> GetAll();
        TEntity GetOneRecord(long id);
        void Add(TEntity entity);
        void Remove(long id);

    }
}
