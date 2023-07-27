using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YogaCenter.IRepository;
using YogaCenter.Models;
using YogaCenter.ModelsDto;
using YogaCenter.Repository;

namespace YogaCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : Controller
    {
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IMapper _mapper;
        private readonly ICustomerRepository _customerRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly IClassCustomerRepository _classCustomer;

        public InvoiceController(IInvoiceRepository invoiceRepository, IMapper mapper, ICustomerRepository customerRepository,
            ICourseRepository courseRepository, IClassCustomerRepository classCustomer)
        {
            _invoiceRepository = invoiceRepository;
            _mapper = mapper;
            _customerRepository = customerRepository;
            _courseRepository = courseRepository;
            _classCustomer = classCustomer;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllInvoice()
        {
            var invoice = await _invoiceRepository.GetAllInvoice();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(invoice);
        }
        [HttpGet("GetAllStudent")]
        public async Task<IActionResult> GetAllStudent()
        {
            var students = await _invoiceRepository.GetAllStudents();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(students);
        }
        [HttpGet("course/{courseId}")]
        public async Task<IActionResult> GetLessoByCourseId(Guid courseId)
        {
            if (courseId.Equals(null)) return BadRequest();
            if (!await _courseRepository.CourseExists(courseId)) return NotFound();

            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var invoice = await _invoiceRepository.GetInvoiceByCourseId(courseId);
            return Ok(invoice);
        }
        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> GetLessoByCostomerId(Guid customerId)
        {
            if (customerId.Equals(null)) return BadRequest();
            if (!await _customerRepository.CustomerExists(customerId)) return NotFound();

            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var invoice = await _invoiceRepository.GetInvoiceByCustomerId(customerId);
            return Ok(invoice);
        }
        [HttpGet("{customerId}/{classId}")]
        public async Task<IActionResult> GetInvoiceByCusIdAndClassId(Guid customerId, string classId)
        {
            if (customerId.Equals(null)|| classId.Equals(null)) return BadRequest();
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var classid = "Paid-" + classId;
            var invoice = await _invoiceRepository.GetInvoiceByCusIdAndClassId(customerId, classid);
            return Ok(invoice);
        }

        [HttpPost]
        public async Task<IActionResult> CreateInvoice([FromHeader] Guid customerId, [FromHeader] Guid courseId, [FromBody] InvoiceDto invoiceDto)
        {
            if (invoiceDto == null) { return BadRequest(); }
            if (await _invoiceRepository.InvoiceExists(invoiceDto.Id))
            {
                ModelState.AddModelError("", "Invoice Id already existed");
                return BadRequest(ModelState);
            }

            if (customerId.Equals(Guid.Empty) || courseId.Equals(Guid.Empty)) { return BadRequest("Miss Something"); }
            if (!await _customerRepository.CustomerExists(customerId)) return BadRequest("Customer is not exists");
            if (!await _courseRepository.CourseExists(courseId)) return BadRequest("Course is not exists");
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var invoice = _mapper.Map<Invoice>(invoiceDto);
            invoice.Id = Guid.NewGuid();

            invoice.Customer = await _customerRepository.GetCustomerById(customerId);
            invoice.Course = await _courseRepository.GetCourseById(courseId);
            if (await _invoiceRepository.CreateInvoice(invoice))
            {
                return Ok("Created");
            }
            return NotFound();
        }
        [HttpPost("VNPay")]
        public async Task<IActionResult> CreateInvoiceByVNPay([FromHeader] Guid customerId, [FromHeader] Guid courseId, [FromBody] InvoiceDto invoiceDto)
        {
            if (invoiceDto == null) { return BadRequest(); }
            if (await _invoiceRepository.InvoiceExists(invoiceDto.Id))
            {
                ModelState.AddModelError("", "Invoice Id already existed");
                return BadRequest(ModelState);
            }

            if (customerId.Equals(Guid.Empty) || courseId.Equals(Guid.Empty)) { return BadRequest("Miss Something"); }
            if (!await _customerRepository.CustomerExists(customerId)) return BadRequest("Customer is not exists");
            if (!await _courseRepository.CourseExists(courseId)) return BadRequest("Course is not exists");
            //if (await _invoiceRepository.InvoiceExistsByTransaction(invoiceDto.Note)) return BadRequest("Bad Transaction");
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var invoice = _mapper.Map<Invoice>(invoiceDto);
     
            invoice.Customer = await _customerRepository.GetCustomerById(customerId);
            invoice.Course = await _courseRepository.GetCourseById(courseId);
            if (await _invoiceRepository.CreateInvoice(invoice))
            {
                return Ok("Created");
            }
            return NotFound();
        }

        [HttpDelete("{invoiceId}")]
        public async Task<IActionResult> DeleteInvoice(Guid invoiceId)
        {
            if (invoiceId.Equals(null)) { return BadRequest("Miss ID"); }
            if (!await _invoiceRepository.InvoiceExists(invoiceId))
            {
                ModelState.AddModelError("", "Invoice is not Exists");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var invoice = await _invoiceRepository.GetInvoiceById(invoiceId);
            if (invoice == null) { return BadRequest(); }
            if (await _invoiceRepository.DeleteInvoice(invoice))
            {
                return Ok("Deleted");
            }
            return NotFound();
        }
        [HttpPost("CancelProcedure/{classId}")]
        public async Task<IActionResult> CancelClass(Guid classId, [FromHeader] Guid customerId)
        {
            if(classId.Equals(null)) { return BadRequest(); };
            var note = "Paid_" + classId;
            var invoices = await _invoiceRepository.GetInvoiceByClassIdAndCusId(customerId,note);
            if (invoices == null) { return NotFound(); }
            if(!ModelState.IsValid) { return BadRequest(ModelState); }
            foreach(var invoice in invoices)
            {
                invoice.Note = "Cancel_" + classId;
                if(await _invoiceRepository.UpdateInvoice(invoice))
                {
                   
                }
            }

            return Ok();

        }
        [HttpPost("CancelCustomerProcedure/{classId}")]
        public async Task<IActionResult> CancelCustomer(Guid classId, [FromHeader] Guid customerId)
        {
            if (classId.Equals(null)) { return BadRequest(); };
            var note = "Paid_" + classId;
            var invoices = await _invoiceRepository.GetInvoiceByClassIdAndCusIdToCancel(customerId, note);
            if (invoices == null) { return NotFound(); }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            foreach (var invoice in invoices)
            {
                invoice.Note = "Cancel_" + classId;
                if (await _invoiceRepository.UpdateInvoice(invoice))
                {
                    return Ok();
                }
            }
            return BadRequest();
            

        }
    }
}
