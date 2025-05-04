import nodemailer from 'nodemailer';

import { CustomError } from '../../domain/errors';
import { EmailService } from '../../ports/services';
import { EnvConfig } from '../../config';
import { LoginAccountDto } from '../../domain/dtos/email';
import {
  getLoginAccountHTML,
  getRecoverPasswordHTML,
  getVerifyAccountHTML,
} from '../../domain/external';
import { VerifyAccountDto } from '../../domain/schemas/email';

export class EmailServiceImpl implements EmailService {
  constructor() {}

  async sendEmailVerifyAccount(
    verifyAccountDto: VerifyAccountDto,
  ): Promise<boolean> {
    const { email, name, last_name, token } = verifyAccountDto;

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SYSTEM_NAME,
      FRONTEND_URL,
    } = EnvConfig();

    try {
      const transport = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      const html = getVerifyAccountHTML({
        SYSTEM_NAME: SYSTEM_NAME,
        USER_NAME: name,
        USER_LAST_NAME: last_name,
        VERIFICATION_URL: `${FRONTEND_URL}/auth/verify/${token}`,
      });

      await transport.sendMail({
        from: `${SYSTEM_NAME} <gsgroup@gmail.com>`,
        to: email,
        subject: `${SYSTEM_NAME} - Confirma tu cuenta`,
        text: 'Valida tu dirección email para acceder a tu cuenta por completo',
        html: html,
      });

      return true;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Error al enviar el correo');
    }
  }

  async sendLoginAccount(loginAccountDto: LoginAccountDto): Promise<boolean> {
    const { email, name, last_name, password } = loginAccountDto;

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SYSTEM_NAME,
      FRONTEND_URL,
    } = EnvConfig();

    try {
      const transport = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      const html = getLoginAccountHTML({
        SYSTEM_NAME: SYSTEM_NAME,
        USER_NAME: name,
        USER_LAST_NAME: last_name,
        PASSWORD: password,
        VERIFICATION_URL: `${FRONTEND_URL}/auth`,
      });

      await transport.sendMail({
        from: `${SYSTEM_NAME} <gsgroupp@gmail.com>`,
        to: email,
        subject: `${SYSTEM_NAME} - Confirma tu cuenta`,
        text: 'Valida tu dirección email para acceder a tu cuenta por completo',
        html: html,
      });

      return true;
    } catch (error) {
      throw CustomError.internalServer('Error al enviar el correo');
    }
  }

  async sendEmailRecoverPassword(
    verifyAccountDto: VerifyAccountDto,
  ): Promise<boolean> {
    const { email, name, last_name, token } = verifyAccountDto;

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SYSTEM_NAME,
      FRONTEND_URL,
    } = EnvConfig();

    try {
      const transport = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });
      const html = getRecoverPasswordHTML({
        SYSTEM_NAME: SYSTEM_NAME,
        USER_NAME: name,
        USER_LAST_NAME: last_name,
        CHANGE_PWD_URL: `${FRONTEND_URL}/auth/change-password/${token}`,
      });

      await transport.sendMail({
        from: `${SYSTEM_NAME} <gsgroup@gmail.com>`,
        to: email,
        subject: `${SYSTEM_NAME} - Recuperar mi cuenta`,
        text: 'Recupera el acceso a tu cuenta',
        html: html,
      });

      return true;
    } catch (error) {
      throw CustomError.internalServer('Error al enviar el correo');
    }
  }
}
