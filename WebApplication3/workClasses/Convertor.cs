using Concentus.Structs;
using Concentus;

using NAudio.Wave;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Concentus.Oggfile;

namespace WebApplication3.workClasses
{
    public class Convertor
    {


       /* static void Main(string[] args)
        {
            // Display the number of command line arguments.
            Console.WriteLine(args.Length);
        }*/

        static void ToWav()
        {
            var filePath = $@"C:\Users\blabla\foo\bar\";
            var fileOgg = "testAudio.ogg";
            var fileWav = "testAudio.wav";

            using (FileStream fileIn = new FileStream($"{filePath}{fileOgg}", FileMode.Open))
            using (MemoryStream pcmStream = new MemoryStream())
            {
                OpusDecoder decoder = OpusDecoder.Create(48000, 1);
                OpusOggReadStream oggIn = new OpusOggReadStream(decoder, fileIn);
                while (oggIn.HasNextPacket)
                {
                    short[] packet = oggIn.DecodeNextPacket();
                    if (packet != null)
                    {
                        for (int i = 0; i < packet.Length; i++)
                        {
                            var bytes = BitConverter.GetBytes(packet[i]);
                            pcmStream.Write(bytes, 0, bytes.Length);
                        }
                    }
                }
                pcmStream.Position = 0;
                var wavStream = new RawSourceWaveStream(pcmStream, new WaveFormat(48000, 1));
                var sampleProvider = wavStream.ToSampleProvider();
                WaveFileWriter.CreateWaveFile16($"{filePath}{fileWav}", sampleProvider);
            }

        }


    }
}