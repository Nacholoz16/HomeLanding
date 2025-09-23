"use client";

import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";

const FormularioContacto = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_vux1x8j", // Reemplaza con tu Service ID
        "template_mtxl39b", // Reemplaza con tu Template ID
        formRef.current,
        "AgojBih75ho_9EI7N" // Reemplaza con tu Public Key
      )
      .then(
      () => {
        toast.success("¡Mensaje enviado con éxito!");
        formRef.current?.reset();
      },
      () => {
        toast.error(" Error. Intenta nuevamente.");
      }
    )
    .finally(() => setIsSending(false));
  };

  return (
    <div className="bg-background/10 backdrop-blur-sm p-8 rounded-lg">
      <h3 className="text-2xl font-bold mb-6">Solicita tu Cotización Gratuita</h3>
      <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nombre Completo
          </label>
          <input
            type="text"
            id="name"
            name="user_name"
            required
            className="w-full px-4 py-3 bg-[#23272f] border border-primary-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary-foreground placeholder-primary-foreground/60"
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
            name="user_email"
            required
            className="w-full px-4 py-3 bg-[#23272f] border border-primary-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary-foreground placeholder-primary-foreground/60"
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
            name="user_phone"
            className="w-full px-4 py-3 bg-[#23272f] border border-primary-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary-foreground placeholder-primary-foreground/60"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label htmlFor="project" className="block text-sm font-medium mb-2">
            Tipo de Proyecto
          </label>
          <select
            id="project"
            name="user_project"
            required
            className="w-full px-4 py-3 bg-[#23272f] border border-primary-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary-foreground"
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
            required
            className="w-full px-4 py-3 bg-[#23272f] border border-primary-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary-foreground placeholder-primary-foreground/60"
            placeholder="Cuéntanos sobre tu proyecto..."
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSending}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 px-6 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50"
        >
          {isSending ? "Enviando..." : "Enviar Solicitud"}
        </button>

      </form>
      
    </div>
    
  );
};

export default FormularioContacto;