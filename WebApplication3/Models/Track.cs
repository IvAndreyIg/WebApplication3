using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication3.Models
{
    public class Track
    {

        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }


        [Display(Name = "Имя")]
        public string Name { get; set; }


        public string FileId { get; set; }

        public bool HasFile()
        {

            return !String.IsNullOrWhiteSpace(FileId);
        }
    }
}
