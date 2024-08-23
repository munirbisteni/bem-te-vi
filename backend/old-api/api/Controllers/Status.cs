using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class Status : Controller
{
    [HttpGet]
    public IActionResult GetStatus()
    {
        return Ok("API funcionando.");
    }
}
