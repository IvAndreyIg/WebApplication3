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
    public class ProductService
    {
        IGridFSBucket gridFS;

        IMongoCollection<Product> Products;

        public ProductService()
        {
            string connectionString = "mongodb://localhost:27017/mobilestore";

            var connection = new MongoUrlBuilder(connectionString);

            var client = new MongoClient(connectionString);

            var database = client.GetDatabase(connection.DatabaseName);

            gridFS = new GridFSBucket(database);

            Products = database.GetCollection<Product>("Product");

        }

        public async Task<IEnumerable<Product>> GetProducts(int? minPrice,int? maxPrice, string name)
        {
            var builder = new FilterDefinitionBuilder<Product>();

            var filter = builder.Empty;

            if (!String.IsNullOrWhiteSpace(name))
            {
                filter &= builder.Regex("Name",new BsonRegularExpression(name));
            }

            if (maxPrice.HasValue) {
                filter &= builder.Gte("Price", maxPrice.Value);

            }

            if (minPrice.HasValue){
                filter &= builder.Lte("Price", minPrice.Value);
            }

            return await Products.Find(filter).ToListAsync();
        }
        public async Task<Product> GetProduct(string id) {
        
            return await Products.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
        }
        // добавление документа
        public async Task Create(Product p)
        {
            await Products.InsertOneAsync(p);
        }
        // обновление документа
        public async Task Update(Product p)
        {
            await Products.ReplaceOneAsync(new BsonDocument("_id", new ObjectId(p.Id)), p);
        }
        // удаление документа
        public async Task Remove(string id)
        {
            await Products.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
        }
                public async Task<byte[]> GetImage(string id)
                {
                    return await gridFS.DownloadAsBytesAsync(new ObjectId(id));
                }

                public async Task StoreImage(string id ,Stream imageStream,string imageName)
                {
                    Product p = await GetProduct(id);
                    if(p.HasImage())
                    {
                        await gridFS.DeleteAsync(new ObjectId(p.ImageId));

                    }

                    ObjectId imageID = await gridFS.UploadFromStreamAsync(imageName, imageStream);

                    p.ImageId = imageID.ToString();
         
                    var filter = Builders<Product>.Filter.Eq("_id", new ObjectId(p.Id));
                    var update = Builders<Product>.Update.Set("ImageId", p.ImageId);
                    await Products.UpdateOneAsync(filter, update);
                }

            public async Task<byte[]> GetTrack(string id)
            {
                return await gridFS.DownloadAsBytesAsync(new ObjectId(id));
            }

            public async Task StoreTrack(string id, Stream trackStream, string trackName)
            {
                Product p = await GetProduct(id);
                if (p.HasTrack())
                {
                    await gridFS.DeleteAsync(new ObjectId(p.TrackId));

                }

                ObjectId trackID = await gridFS.UploadFromStreamAsync(trackName, trackStream);

                p.TrackId = trackID.ToString();

                var filter = Builders<Product>.Filter.Eq("_id", new ObjectId(p.Id));
                var update = Builders<Product>.Update.Set("TrackId", p.TrackId);
                await Products.UpdateOneAsync(filter, update);
            }
    }
}

