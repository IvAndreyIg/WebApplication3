using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication3.Models
{
    public class Product
    {

      
        [Display(Name="Имя")]
        public string Name { get; set; }
        
        [Display(Name="Произодитель")]
        public string Company { get; set; }

      [Display(Name="Цена")]
        public string Price { get; set; }

        
        public string ImageId { get; set; }

        public bool HasImage()
        {
            return !String.IsNullOrWhiteSpace(ImageId);
        }
            [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string TrackId { get; set; }

        public bool HasTrack()
        {

            return !String.IsNullOrWhiteSpace(TrackId);
        }

    }
}
