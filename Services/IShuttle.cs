using System;
using System.Collections.Generic;
using yo_yo_app.Models;

namespace yo_yo_app.Services
{
    public interface IShuttle
    {
        IEnumerable<ShuttleDTO> GetShuttles();
    }

    public class Shuttle : IShuttle
    {
        public IEnumerable<ShuttleDTO> GetShuttles()
        {
            var jsonStr = System.IO.File.ReadAllText("fitnessrating_beeptest.json");
            var shuttles = Newtonsoft.Json.JsonConvert.DeserializeObject<List<ShuttleDTO>>(jsonStr);
            return shuttles;
        }
    }
}
