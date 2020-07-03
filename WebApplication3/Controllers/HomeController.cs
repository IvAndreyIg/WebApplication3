﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    public class HomeController : Controller

    {
/*
        private readonly ILogger _logger;

        private readonly ProductService db;
        public HomeController(ILogger<HomeController> logger,ProductService context)
        {
            _logger = logger;
            db = context;
        }
        public async Task<IActionResult> Index(FilterViewModel filter)
        {
            _logger.LogInformation("Index Strat");
            var phones = await db.GetProducts(filter.MinPrice, filter.MaxPrice, filter.Name);
            var model = new IndexViewModel { Products = phones, Filter = filter };
            return View(model);
        }

        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Create(Product p)
        {
            if (ModelState.IsValid)
            {
                await db.Create(p);
                return RedirectToAction("Index");
            }
            return View(p);
        }



        public async Task<IActionResult> Edit(string id)

        {

            _logger.LogInformation("Edit Strat");
            Product p = await db.GetProduct(id);
            if (p == null)
                return NotFound();
            return View(p);
        }
        [HttpPost]
        public async Task<IActionResult> Edit(Product p)
        {
            if (ModelState.IsValid)
            {
                await db.Update(p);
                return RedirectToAction("Index");
            }
            return View(p);
        }
        public async Task<IActionResult> Delete(string id)
        {
            await db.Remove(id);
            return RedirectToAction("Index");
        }

        public async Task<ActionResult> AttachImage(string id)
        {
            Product p = await db.GetProduct(id);
            if (p == null)
                return NotFound();
            return View(p);
        }
        [HttpPost]
        public async Task<ActionResult> AttachImage(string id, IFormFile uploadedFile)
        {
            if (uploadedFile != null)
            {
                await db.StoreImage(id, uploadedFile.OpenReadStream(), uploadedFile.FileName);
            }
            return RedirectToAction("Index");
        }

        public async Task<ActionResult> GetImage(string id)
        {
            var image = await db.GetImage(id);
            if (image == null)
            {
                return NotFound();
            }
            return File(image, "image/png");
        }



        public async Task<ActionResult> AttachTrack(string id)
        {
            Product p = await db.GetProduct(id);
            if (p == null)
                return NotFound();
            return View(p);
        }
        [HttpPost]
        public async Task<ActionResult> AttachTrack(string id, IFormFile uploadedTrack) 
        {

            _logger.LogInformation($"User {id} logged in from {uploadedTrack != null}");

            if (uploadedTrack != null)
            {
                
                await db.StoreTrack(id, uploadedTrack.OpenReadStream(), uploadedTrack.FileName);
            }
            return RedirectToAction("Index");
        }

        public async Task<ActionResult> GetTrack(string id)
        {
            var image = await db.GetTrack(id);
            _logger.LogInformation($"User {id} track is {image == null}");
            if (image == null)
            {
                return NotFound();
            }
            return File(image, "audio/mpeg3");
        }





*/

    }
}
