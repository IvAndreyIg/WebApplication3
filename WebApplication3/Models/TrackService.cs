using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MongoDB;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace WebApplication3.Models
{
    public class TrackService
    {



        IGridFSBucket gridFS;

        IMongoCollection<Track> Tracks;

        public TrackService()
        {
            string connectionString = "mongodb://212.232.75.37:27017/musicstore3";

            var connection = new MongoUrlBuilder(connectionString);

            var client = new MongoClient(connectionString);

            var database = client.GetDatabase(connection.DatabaseName);

            gridFS = new GridFSBucket(database);

            Tracks = database.GetCollection<Track>("Track");

        }

        public async Task<IEnumerable<Track>> GetTracks( string name)
        {
            var builder = new FilterDefinitionBuilder<Track>();

            var filter = builder.Empty;

            /*if (!String.IsNullOrWhiteSpace(name))
            {
                filter &= builder.Regex("Name", new BsonRegularExpression(name));
            }*/

           /* if (maxPrice.HasValue)
            {
                filter &= builder.Gte("Price", maxPrice.Value);

            }

            if (minPrice.HasValue)
            {
                filter &= builder.Lte("Price", minPrice.Value);
            }*/

            return await Tracks.Find(filter).ToListAsync();
        }
        public async Task<Track> GetTrack(string id)
        {

            return await Tracks.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
        }
        // добавление документа
        public async Task Create(Track p)
        {
            await Tracks.InsertOneAsync(p);
        }
        // обновление документа
        public async Task Update(Track p)
        {
            await Tracks.ReplaceOneAsync(new BsonDocument("_id", new ObjectId(p.Id)), p);
        }
        // удаление документа
        public async Task Remove(string id)
        {
            await Tracks.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
        }
      

        public async Task<byte[]> GetFile(string id)
        {
            return await gridFS.DownloadAsBytesAsync(new ObjectId(id));
        }

        public async Task StoreFile(string id, Stream trackStream, string trackName)
        {
            Track p = await GetTrack(id);
            if (p.HasFile())
            {
                await gridFS.DeleteAsync(new ObjectId(p.FileId));

            }

            ObjectId trackID = await gridFS.UploadFromStreamAsync(trackName, trackStream);

            p.FileId = trackID.ToString();

            var filter = Builders<Track>.Filter.Eq("_id", new ObjectId(p.Id));
            var update = Builders<Track>.Update.Set("FileId", p.FileId);
            await Tracks.UpdateOneAsync(filter, update);
        }
    }
}
