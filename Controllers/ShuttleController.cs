using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using yo_yo_app.Models;
using yo_yo_app.Services;

namespace yo_yo_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShuttleController : ControllerBase
    {
        private IShuttle _shuttle;

        public ShuttleController(IShuttle shuttle){
            _shuttle = shuttle;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_shuttle.GetShuttles());
        }
    }
}
