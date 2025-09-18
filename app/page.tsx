"use client"

import Carousel from "@/components/Carousel";
import { useEffect } from "react"

const slides = [
  {
    image: "/modern-home-renovation.png",
    title: "Experiencia Internacional",
    description: "Con 2 años en Estados Unidos y más de 5 años en remodelaciones, llevamos la experiencia que tu hogar merece.",
  },
  {
    image: "kitchen-renovation.png",
    title: "Especialización en Remodelaciones",
    description: "Transformamos baños, cocinas, dormitorios y diversos espacios con diseño, funcionalidad y profesionalismo.",
  },
  {
    image: "/luxury-modern-bathroom.png",
    title: "Excelencia Profesional",
    description: "Compromiso con acabados de calidad y atención a los detalles, generamos confianza en cada proyecto.",
  },
];


const Page = () => {
  useEffect(() => {
    let currentSlide = 0
    const slides = document.querySelectorAll(".carousel-slide")
    const dots = document.querySelectorAll(".carousel-dot")
    const carouselContainer = document.querySelector<HTMLElement>(".carousel-container");

    const showSlide = (index: number) => {
      if (carouselContainer) {
        carouselContainer.style.transform = `translateX(-${index * 33.333}%)`
      }

      dots.forEach((dot, i) => {
        dot.classList.toggle("bg-white", i === index)
        dot.classList.toggle("bg-white/50", i !== index)
      })
    }

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length
      showSlide(currentSlide)
    }

    // Auto-advance carousel
    const carouselInterval = setInterval(nextSlide, 5000)

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index
        showSlide(currentSlide)
        clearInterval(carouselInterval)
      })
    })

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
        }
      })
    }, observerOptions)

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observer.observe(el)
    })

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById("mobile-menu-button")
    const mobileMenu = document.getElementById("mobile-menu")

    mobileMenuButton?.addEventListener("click", () => {
      mobileMenu?.classList.toggle("hidden")
    })

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href") as string) as HTMLElement;
        if (target) {
          const targetPosition = target.offsetTop - 80 // Account for fixed navbar
          const startPosition = window.pageYOffset
          const distance = targetPosition - startPosition
          const duration = 1000 // 1 second
          let start: number | null = null

          function animation(currentTime: number) {
            if (start === null) start = currentTime
            const timeElapsed = currentTime - start
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
            window.scrollTo(0, run)
            if (timeElapsed < duration) requestAnimationFrame(animation)
          }

          // Easing function for smooth animation
          function easeInOutQuad(t: number, b: number, c: number, d: number) {
            t /= d / 2
            if (t < 1) return (c / 2) * t * t + b
            t--
            return (-c / 2) * (t * (t - 2) - 1) + b
          }

          requestAnimationFrame(animation)

          // Close mobile menu if open
          mobileMenu?.classList.add("hidden")
        }
      })
    })

    // Modal functionality
    const openModal = (modalId: string) => {
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.classList.add("show")
        document.body.style.overflow = "hidden"
      }
    }

    const closeModal = (modalId: string) => {
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.classList.remove("show")
        document.body.style.overflow = "auto"
      }
    }

    // Add click handlers for portafolio items
    document.querySelectorAll("[data-modal]").forEach((item) => {
      item.addEventListener("click", () => {
        const modalId = item.getAttribute("data-modal")
        if (modalId) openModal(modalId)
      })
    })

    // Add click handlers for close buttons
    document.querySelectorAll(".close").forEach((closeBtn) => {
      closeBtn.addEventListener("click", (e) => {
        const modal = (e.target as Element).closest(".modal")
        if (modal) {
          closeModal(modal.id)
        }
      })
    })

    // Close modal when clicking outside
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal(modal.id)
        }
      })
    })

    return () => {
      clearInterval(carouselInterval)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="bg-background text-foreground">
      {/* Navigation */}
      <nav
        id="navbar"
        className="fixed top-0 w-full z-50 transition-all duration-300 bg-background/95 backdrop-blur-sm border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">RemodelaPro</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#inicio"
                  className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
                >
                  Inicio
                </a>
                <a
                  href="#servicios"
                  className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
                >
                  Servicios
                </a>
                <a
                  href="#quienes-somos"
                  className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
                >
                  Quienes somos
                </a>
                <a
                  href="#portafolio"
                  className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
                >
                  Portafolio
                </a>
                <a
                  href="#contacto"
                  className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
                >
                  Contacto
                </a>
              </div>
            </div>
            <div className="md:hidden">
              <button id="mobile-menu-button" className="text-foreground hover:text-accent">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div id="mobile-menu" className="md:hidden hidden bg-background border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#inicio" className="block px-3 py-2 text-foreground hover:text-accent transition-colors">
              Inicio
            </a>
            <a href="#servicios" className="block px-3 py-2 text-foreground hover:text-accent transition-colors">
              Servicios
            </a>
            <a href="#quienes-somos" className="block px-3 py-2 text-foreground hover:text-accent transition-colors">
              Quienes Somos
            </a>
            <a href="#portafolio" className="block px-3 py-2 text-foreground hover:text-accent transition-colors">
              Portafolio
            </a>
            <a href="#contacto" className="block px-3 py-2 text-foreground hover:text-accent transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Carousel */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="carousel-wrapper w-full h-screen relative overflow-hidden">
          <div className="carousel-container flex w-[300%] h-full transition-transform duration-700 ease-in-out">
            {/* Slide 1 */}
            <div className="carousel-slide w-1/3 relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
              <img
                src="/kitchen-renovation.png"
                alt="Remodelación moderna de cocina"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-4">
                  <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Transformamos tu Hogar</h2>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                    15 años creando espacios únicos con la más alta calidad y diseño innovador
                  </p>
                  <a
                    href="#contacto"
                    className="group relative inline-block overflow-hidden bg-black text-white border border-black px-10 py-4 rounded-lg text-lg font-medium tracking-wide transition-all duration-300 transform hover:scale-105  "
                  >
                    <span className="relative z-10">Solicita tu Cotización</span>
                    <span className="shine" aria-hidden="true"></span>
                  </a>


                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-slide w-1/3 relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
              <img
                src="/luxury-modern-bathroom.png"
                alt="Remodelación de baño de lujo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-4">
                  <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Calidad Garantizada</h2>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                    Cada proyecto es único, diseñado especialmente para ti con materiales premium
                  </p>
                  <a
                    href="#contacto"
                    className="group relative inline-block overflow-hidden bg-black text-white border border-black px-10 py-4 rounded-lg text-lg font-medium tracking-wide transition-all duration-300 transform hover:scale-105  "
                  >
                    <span className="relative z-10">Ve nuestros proyectos</span>
                    <span className="shine" aria-hidden="true"></span>
                  </a>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-slide w-1/3 relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
              <img
                src="/modern-home-renovation.png"
                alt="Remodelación completa de interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-4">
                  <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Experiencia Profesional</h2>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                    Equipo especializado en remodelaciones integrales con resultados excepcionales
                  </p>
                  <a
                    href="#contacto"
                    className="group relative inline-block overflow-hidden bg-black text-white border border-black px-10 py-4 rounded-lg text-lg font-medium tracking-wide transition-all duration-300 transform hover:scale-105  "
                  >
                    <span className="relative z-10">Conoce nuestros servicios</span>
                    <span className="shine" aria-hidden="true"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
          <button
            className="carousel-dot w-3 h-3 rounded-full bg-white transition-all duration-200"
            data-slide="0"
          ></button>
          <button
            className="carousel-dot w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-all duration-200"
            data-slide="1"
          ></button>
          <button
            className="carousel-dot w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-all duration-200"
            data-slide="2"
          ></button>
        </div>
      </section>

      {/* Section Separator */}
      <div className="h-16 bg-gradient-to-r from-accent/10 to-transparent"></div>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Nuestros Servicios</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ofrecemos soluciones completas de remodelación con la más alta calidad y atención al detalle
            </p>
          </div>

          <div className="space-y-16">
            {/* Service 1 */}
            <div className="scroll-reveal flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <img
                  src="/modern-kitchen-renovation.png"
                  alt="Remodelación de cocinas"
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="lg:w-1/2 space-y-6">
                <h3 className="text-3xl font-bold text-primary">Remodelación de Cocinas</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Transformamos tu cocina en el corazón de tu hogar. Diseños modernos, funcionales y elegantes con
                  materiales de primera calidad. Desde cocinas contemporáneas hasta estilos clásicos, creamos espacios
                  que combinan belleza y funcionalidad.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <span className="text-accent mr-2">✓</span> Diseño personalizado
                  </li>
                  <li className="flex items-center">
                    <span className="text-accent mr-2">✓</span> Materiales premium
                  </li>
                  <li className="flex items-center">
                    <span className="text-accent mr-2">✓</span> Instalación profesional
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 2 */}
            <div className="scroll-reveal flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2">
                <img
                  src="/luxury-modern-bathroom.png"
                  alt="Remodelación de baños"
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="lg:w-1/2 space-y-6">
                <h3 className="text-3xl font-bold text-primary">Remodelación de Baños</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Convierte tu baño en un oasis de relajación y elegancia. Especialistas en baños de lujo con acabados
                  impecables, tecnología moderna y diseños que maximizan el espacio y la comodidad.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <span className="text-accent mr-2">✓</span> Sistemas de ducha modernos
                  </li>
                  <li className="flex items-center">
                    <span className="text-accent mr-2">✓</span> Acabados de lujo
                  </li>
                  <li className="flex items-center">
                    <span className="text-accent mr-2">✓</span> Optimización de espacios
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 3 */}
            <div className="scroll-reveal flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <img
                  src="dormitorio-remodelacion-servicios.jpg"
                  alt="Remodelación integral"
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="lg:w-1/2 space-y-6">
                <h3 className="text-3xl font-bold text-primary">Remodelación de Dormitorios</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Renovamos dormitorios para crear espacios cómodos y personalizados. Mejoramos la iluminación, el almacenamiento y el diseño para lograr ambientes acogedores y funcionales.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <span className="text-accent mr-2">✓</span> Diseño personalizado de dormitorios
                  </li>
                  <li className="flex items-center">
                    <span className="text-accent mr-2">✓</span> Optimización de espacios y almacenamiento
                  </li>
                  <li className="flex items-center">
                    <span className="text-accent mr-2">✓</span> Acabados modernos y confortables
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}

      <div className="h-16 bg-gradient-to-l from-accent/10 to-transparent"></div>
      <section id="quienes-somos" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Quienes Somos</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto ">
              Tras años de experiencia en EE.UU. junto a especialistas, hoy transformamos baños, cocinas y dormitorios con el mismo nivel de calidad internacional: profesionalismo, confianza y resultados que marcan la diferencia.
            </p>
            <div className="p-4">
              <Carousel slides={slides} interval={5000} />

            </div>


          </div>

        </div>

      </section>
      {/* Section Separator */}
      <div className="h-16 bg-gradient-to-l from-accent/10 to-transparent"></div>

      {/* portafolio Section */}
      <section id="portafolio" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Nuestro portafolio</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubre algunos de nuestros proyectos más destacados y la transformación que hemos logrado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="scroll-reveal group cursor-pointer portafolio-card" data-modal="modal1">
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                <img
                  src="/modern-white-marble-kitchen.png"
                  alt="Cocina Moderna Minimalista"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Cocina Moderna Minimalista</h3>
                    <p className="text-sm">Casa Residencial - 2024</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glass-reflection"></div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="scroll-reveal group cursor-pointer portafolio-card" data-modal="modal2">
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                <img
                  src="/luxury-marble-bathroom.png"
                  alt="Baño de Lujo Contemporáneo"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Baño de Lujo Contemporáneo</h3>
                    <p className="text-sm">Apartamento Premium - 2024</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glass-reflection"></div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="scroll-reveal group cursor-pointer portafolio-card" data-modal="modal3">
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                <img
                  src="/modern-open-living.png"
                  alt="Sala de Estar Concepto Abierto"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Sala Concepto Abierto</h3>
                    <p className="text-sm">Casa Familiar - 2023</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glass-reflection"></div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="scroll-reveal group cursor-pointer portafolio-card" data-modal="modal4">
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                <img
                  src="/modern-master-bedroom-closet.png"
                  alt="Dormitorio Principal con Vestidor"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Dormitorio Principal</h3>
                    <p className="text-sm">Remodelación Integral - 2023</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glass-reflection"></div>
              </div>
            </div>

            {/* Project 5 */}
            <div className="scroll-reveal group cursor-pointer portafolio-card" data-modal="modal5">
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                <img
                  src="/home-office-built-in-shelving.png"
                  alt="Oficina en Casa Moderna"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Oficina en Casa</h3>
                    <p className="text-sm">Espacio de Trabajo - 2024</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glass-reflection"></div>
              </div>
            </div>

            {/* Project 6 */}
            <div className="scroll-reveal group cursor-pointer portafolio-card" data-modal="modal6">
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                <img
                  src="/modern-outdoor-terrace.png"
                  alt="Terraza Exterior Renovada"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Terraza Exterior</h3>
                    <p className="text-sm">Espacio Exterior - 2023</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glass-reflection"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Contáctanos</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              "Transformamos sueños en realidad, un espacio a la vez"
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="bg-accent p-3 rounded-lg">
                  <svg className="w-6 h-6 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Teléfono</h3>
                  <p className="opacity-90">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-accent p-3 rounded-lg">
                  <svg className="w-6 h-6 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">WhatsApp</h3>
                  <p className="opacity-90">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-accent p-3 rounded-lg">
                  <svg className="w-6 h-6 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Email</h3>
                  <p className="opacity-90">info@remodelapro.com</p>
                </div>
              </div>

              <div className="pt-8">
                <h3 className="text-xl font-semibold mb-4">Síguenos en Redes Sociales</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-accent hover:bg-accent/90 p-3 rounded-lg transition-colors duration-200">
                    <svg className="w-6 h-6 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-accent hover:bg-accent/90 p-3 rounded-lg transition-colors duration-200">
                    <svg className="w-6 h-6 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-accent hover:bg-accent/90 p-3 rounded-lg transition-colors duration-200">
                    <svg className="w-6 h-6 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-accent hover:bg-accent/90 p-3 rounded-lg transition-colors duration-200">
                    <svg className="w-6 h-6 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-background/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Solicita tu Cotización Gratuita</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-background/20 border border-primary-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary-foreground placeholder-primary-foreground/60"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-background/20 border border-primary-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary-foreground placeholder-primary-foreground/60"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-background/20 border border-primary-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary-foreground placeholder-primary-foreground/60"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="project" className="block text-sm font-medium mb-2">
                    Tipo de Proyecto
                  </label>
                  <select
                    id="project"
                    name="project"
                    className="w-full px-4 py-3 bg-background/20 border border-primary-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary-foreground"
                  >
                    <option value="">Selecciona un tipo de proyecto</option>
                    <option value="cocina">Remodelación de Cocina</option>
                    <option value="baño">Remodelación de Baño</option>
                    <option value="integral">Remodelación Integral</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-background/20 border border-primary-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary-foreground placeholder-primary-foreground/60"
                    placeholder="Cuéntanos sobre tu proyecto..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                >
                  Enviar Solicitud
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Modals for portafolio */}
      <div id="modal1" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <img
            src="/modern-white-marble-kitchen.png"
            alt="Cocina Moderna Minimalista"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h2 className="text-2xl font-bold text-primary mb-4">Cocina Moderna Minimalista</h2>
          <p className="text-muted-foreground mb-4">
            Transformación completa de cocina con diseño minimalista, gabinetes blancos de alta calidad, isla central
            con mármol Carrara y electrodomésticos de última generación.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-semibold text-primary">Tiempo de Ejecución:</h4>
              <p className="text-muted-foreground">6 semanas</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary">Calificación:</h4>
              <div className="flex text-yellow-400">★★★★★</div>
            </div>
          </div>
          <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
            "Superaron todas nuestras expectativas. La cocina quedó exactamente como la habíamos soñado. El equipo fue
            profesional y muy cuidadoso con cada detalle."
            <footer className="mt-2 font-semibold text-primary">- María González</footer>
          </blockquote>
        </div>
      </div>

      <div id="modal2" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <img
            src="/luxury-marble-bathroom.png"
            alt="Baño de Lujo Contemporáneo"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h2 className="text-2xl font-bold text-primary mb-4">Baño de Lujo Contemporáneo</h2>
          <p className="text-muted-foreground mb-4">
            Remodelación completa de baño principal con acabados de lujo, ducha de lluvia, bañera independiente y
            revestimientos en mármol natural.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-semibold text-primary">Tiempo de Ejecución:</h4>
              <p className="text-muted-foreground">4 semanas</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary">Calificación:</h4>
              <div className="flex text-yellow-400">★★★★★</div>
            </div>
          </div>
          <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
            "Un trabajo impecable. Ahora tenemos un spa en casa. La atención al detalle y la calidad de los materiales
            es excepcional."
            <footer className="mt-2 font-semibold text-primary">- Carlos Rodríguez</footer>
          </blockquote>
        </div>
      </div>

      <div id="modal3" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <img
            src="/modern-open-living.png"
            alt="Sala de Estar Concepto Abierto"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h2 className="text-2xl font-bold text-primary mb-4">Sala Concepto Abierto</h2>
          <p className="text-muted-foreground mb-4">
            Renovación integral de sala principal con concepto abierto, eliminación de muros, pisos de madera noble y
            sistema de iluminación inteligente.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-semibold text-primary">Tiempo de Ejecución:</h4>
              <p className="text-muted-foreground">8 semanas</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary">Calificación:</h4>
              <div className="flex text-yellow-400">★★★★★</div>
            </div>
          </div>
          <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
            "Transformaron completamente nuestro hogar. El espacio ahora se siente mucho más amplio y moderno. Excelente
            trabajo en equipo."
            <footer className="mt-2 font-semibold text-primary">- Ana Martínez</footer>
          </blockquote>
        </div>
      </div>

      <div id="modal4" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <img
            src="/modern-master-bedroom-closet.png"
            alt="Dormitorio Principal con Vestidor"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h2 className="text-2xl font-bold text-primary mb-4">Dormitorio Principal</h2>
          <p className="text-muted-foreground mb-4">
            Remodelación completa de dormitorio principal con vestidor personalizado, baño en suite y sistema de
            automatización del hogar.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-semibold text-primary">Tiempo de Ejecución:</h4>
              <p className="text-muted-foreground">5 semanas</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary">Calificación:</h4>
              <div className="flex text-yellow-400">★★★★★</div>
            </div>
          </div>
          <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
            "Nuestro dormitorio ahora es nuestro refugio personal. El vestidor es un sueño hecho realidad. Trabajo de
            primera calidad."
            <footer className="mt-2 font-semibold text-primary">- Luis y Carmen Pérez</footer>
          </blockquote>
        </div>
      </div>

      <div id="modal5" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <img
            src="/home-office-built-in-shelving.png"
            alt="Oficina en Casa Moderna"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h2 className="text-2xl font-bold text-primary mb-4">Oficina en Casa</h2>
          <p className="text-muted-foreground mb-4">
            Creación de espacio de trabajo funcional con estanterías empotradas, escritorio personalizado y sistema de
            iluminación profesional.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-semibold text-primary">Tiempo de Ejecución:</h4>
              <p className="text-muted-foreground">3 semanas</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary">Calificación:</h4>
              <div className="flex text-yellow-400">★★★★★</div>
            </div>
          </div>
          <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
            "Ahora tengo el espacio de trabajo perfecto. Cada detalle fue pensado para maximizar la productividad y el
            confort."
            <footer className="mt-2 font-semibold text-primary">- Roberto Silva</footer>
          </blockquote>
        </div>
      </div>

      <div id="modal6" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <img
            src="/modern-outdoor-terrace.png"
            alt="Terraza Exterior Renovada"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h2 className="text-2xl font-bold text-primary mb-4">Terraza Exterior</h2>
          <p className="text-muted-foreground mb-4">
            Renovación completa de terraza exterior con pérgola moderna, sistema de iluminación LED y área de
            entretenimiento al aire libre.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-semibold text-primary">Tiempo de Ejecución:</h4>
              <p className="text-muted-foreground">4 semanas</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary">Calificación:</h4>
              <div className="flex text-yellow-400">★★★★★</div>
            </div>
          </div>
          <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
            "La terraza se convirtió en nuestro lugar favorito de la casa. Perfecta para recibir invitados y relajarse
            al aire libre."
            <footer className="mt-2 font-semibold text-primary">- Patricia y Miguel Torres</footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}

export default Page
