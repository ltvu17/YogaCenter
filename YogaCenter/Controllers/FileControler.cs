using Microsoft.AspNetCore.Mvc;
using YogaCenter.ModelsDto;

namespace YogaCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly string _uploadDirectory = "C:\\Uploads"; // Thay đổi đường dẫn theo ý muốn

        [HttpPost("UploadFile")]
        public async Task<IActionResult> UploadFile([FromForm] FileDto fileDto)
        {
            try
            {
                if (fileDto.File != null && fileDto.File.Length > 0)
                {
                    string endPath = fileDto.FilePath;
                    string rootDirectory = Path.Combine(AppContext.BaseDirectory, "wwwroot");
                    string fullPathCheck = Path.Combine(rootDirectory, endPath);
                    string fullPath = Path.Combine(_uploadDirectory, fullPathCheck, fileDto.FileName);

                    // Tạo thư mục nếu nó không tồn tại
                    Directory.CreateDirectory(Path.GetDirectoryName(fullPath));

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await fileDto.File.CopyToAsync(stream);
                    }

                    return Ok("File uploaded successfully!");
                }
                else
                {
                    return BadRequest("No file was uploaded.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }
    }
}
