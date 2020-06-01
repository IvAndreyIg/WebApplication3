using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
  //  [Route("Music")]
    public class MusicController : Controller
    {

         [Route("Index")]
        public IActionResult Index()
        {
            return View();
        }

        private readonly ILogger _logger;

        private readonly TrackService db;
        // GET: MusicController
        //главная страница 

        public MusicController(ILogger<HomeController> logger, TrackService context)
        {
            _logger = logger;
            db = context;
        }
        public async Task<IActionResult> MainP()
        {

            _logger.LogInformation("Music Strat");
            var phones = await db.GetTracks("hui");
            var model = phones;
            return View(await db.GetTracks("hui"));

        }

        public async Task<IActionResult> MusicForm()
        {
            _logger.LogInformation("Music Strat");
            var phones = await db.GetTracks( "hui");
            var model = phones;
            return View(await db.GetTracks("hui"));
        }



        public  IActionResult addMusic()
        {

            



            return View();
        }


        [HttpPost]
        public async Task<IActionResult> addMusic(string Name, IFormFile uploadedFile)
        {

            Track newT = new Track();

            newT.Name = Name;


            _logger.LogInformation($"Name: {Name} File is: {uploadedFile != null}");

            await db.Create(newT);

            await db.StoreFile(newT.Id, uploadedFile.OpenReadStream(), uploadedFile.FileName);





           return RedirectToAction("MainP");
        }


        public async Task<ActionResult> GetFile(string id)
        {
            var file = await db.GetFile(id);
            _logger.LogInformation($"User {id} track is {file == null}");
            if (file == null)
            {
                return NotFound();
            }
            return File(file, "audio/mp3");
        }


        // GET: MusicController/Details/5

    }
}
