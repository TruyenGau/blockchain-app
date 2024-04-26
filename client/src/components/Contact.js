import React from 'react';
import "./contact.css";

const Contact = () => {
  return (
    <div>
      {/* Contact Info */}
      <div className='contact_info'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1 d-flex justify-content-between'>

              {/* Contact Info Item - Phone */}
              <div className='contact_info_item'>
                <i className="zmdi zmdi-smartphone"></i>
                <div className='contact_info_content'>
                  <div className='contact_info_title'>Phone</div>
                  <div className='contact_info_text'>+9873645211</div>
                </div>
              </div>

              {/* Contact Info Item - Email */}
              <div className='contact_info_item'>
                <i className="zmdi zmdi-email"></i>
                <div className='contact_info_content'>
                  <div className='contact_info_title'>Email</div>
                  <div className='contact_info_text'>chiracparmar52@gmail.com</div>
                </div>
              </div>

              {/* Contact Info Item - Address */}
              <div className='contact_info_item'>
                <i className="zmdi zmdi-pin"></i>
                <div className='contact_info_content'>
                  <div className='contact_info_title'>Address</div>
                  <div className='contact_info_text'>rose vill los-angeles ca america</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className='contact_form'>
        <div className='container'>
          <div className='row'>
            <div className="col-lg-8 offset-lg-2">

              <div className='contact_form_container py-5'>
                <div className='contact_form_title'>
                  GET IN TOUCH
                </div>

                <form id="contact-form">
                  <div className='contact_form_name'>
                    <input type='text' id='contact_form_name' className='contact_form_name input_field' placeholder='Your name' required />
                    <input type='email' id='contact_form_email' className='contact_form_email input_field' placeholder='Your email' required />
                    <input type='number' id='contact_form_phone' className='contact_form_phone input_field' placeholder='Your number' required />
                  </div>

                  <div className='contact_form_text mt-4'>
                    <textarea className='text_field contact_form_message' cols="30" rows="10" placeholder="Message"></textarea>
                  </div>

                  <div className='contact_form_button mt-4'>
                    <button type='submit' className='button contact_submit_button'>Send Message</button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
