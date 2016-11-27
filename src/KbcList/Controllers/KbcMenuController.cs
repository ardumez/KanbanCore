using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using KbcList.Models;

namespace KbcList.Controllers
{
  [Route("api/[controller]")]
  public class KbcMenuController : Controller
  {
    public IMemoryCache KbcMenus { get; set; }

    public KbcMenuController()
    {
      KbcMenus = new MemoryCache(Options.Create(new MemoryCacheOptions {
        CompactOnMemoryPressure = false
      }));
    }

    [HttpGet]
    public IEnumerable<KbcMenu> GetAll()
    {
      return new List<KbcMenu>(){
        new KbcMenu(){
          Title = "titre 1"
        },
        new KbcMenu(){
          Title = "titre 1"
        },
        new KbcMenu(){
          Title = "titre 1"
        },
        new KbcMenu(){
          Title = "titre 1"
        },
        new KbcMenu(){
          Title = "titre 1"
        },
        new KbcMenu(){
          Title = "titre 1"
        },
        new KbcMenu(){
          Title = "titre 1"
        },
        new KbcMenu(){
          Title = "titre 1"
        }
      }; 
    }  
  } 
}