using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using servicioAlumnos3.Models;

namespace servicioAlumnos3.Controllers
{
    public class cursosController : ApiController
    {
        private ajaxEntities db = new ajaxEntities();

        // GET: api/cursos
        public IQueryable<cursos> Getcursos()
        {
            return db.cursos;
        }

        // GET: api/cursos/5
        [ResponseType(typeof(cursos))]
        public IHttpActionResult Getcursos(int id)
        {
            cursos cursos = db.cursos.Find(id);
            if (cursos == null)
            {
                return NotFound();
            }

            return Ok(cursos);
        }

        // PUT: api/cursos/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putcursos(int id, cursos cursos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cursos.id)
            {
                return BadRequest();
            }

            db.Entry(cursos).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!cursosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/cursos
        [ResponseType(typeof(cursos))]
        public IHttpActionResult Postcursos(cursos cursos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.cursos.Add(cursos);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cursos.id }, cursos);
        }

        // DELETE: api/cursos/5
        [ResponseType(typeof(cursos))]
        public IHttpActionResult Deletecursos(int id)
        {
            cursos cursos = db.cursos.Find(id);
            if (cursos == null)
            {
                return NotFound();
            }

            db.cursos.Remove(cursos);
            db.SaveChanges();

            return Ok(cursos);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool cursosExists(int id)
        {
            return db.cursos.Count(e => e.id == id) > 0;
        }
    }
}