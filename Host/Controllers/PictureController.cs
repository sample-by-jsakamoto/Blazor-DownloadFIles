using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace BlazorWasmDownload.Host.Controllers
{
    [ApiController]
    public class PictureController : ControllerBase
    {
        private IWebHostEnvironment HostEnvironment { get; }

        public PictureController(IWebHostEnvironment hostEnvironment)
        {
            HostEnvironment = hostEnvironment;
        }

        [HttpGet("/pictures/1")]
        public async Task<IActionResult> GetPicture1()
        {
            var fileInfo = this.HostEnvironment.ContentRootFileProvider.GetFileInfo("Assets/1.jpg");
            var pictureBytes = await System.IO.File.ReadAllBytesAsync(fileInfo.PhysicalPath);
            return this.File(pictureBytes, "image/jpeg");
        }
    }
}
