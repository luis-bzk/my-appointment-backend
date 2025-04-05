import { readFileSync } from 'fs';
import { join } from 'path';

import nodemailer from 'nodemailer';

import { EnvConfig } from '../../../config';
import { CustomError } from '../../../domain/errors';

export class EmailGateway {
  constructor() {}

  private static async getTemplate(
    name: string,
    replacements: Record<string, string>,
  ) {
    const filePath = join(__dirname, 'templates', `${name}.html`);
    let content = readFileSync(filePath, 'utf-8');

    for (const key in replacements) {
      content = content.replaceAll(`{{${key}}}`, replacements[key]);
    }

    return content;
  }

  static async sendEmailVerifyAccount({
    email,
    name,
    last_name,
    token,
  }: {
    email: string;
    name: string;
    last_name: string;
    token: string;
  }): Promise<{}> {
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

      const html = await this.getTemplate('verifyAccount', {
        SYSTEM_NAME: SYSTEM_NAME,
        USER_NAME: name,
        USER_LAST_NAME: last_name,
        verification_url: `${FRONTEND_URL}/auth/verify/${token}`,
      });

      await transport.sendMail({
        from: `${SYSTEM_NAME} <gsgroup@gmail.com>`,
        to: email,
        subject: `${SYSTEM_NAME} - Confirma tu cuenta`,
        text: 'Valida tu dirección email para acceder a tu cuenta por completo',
        html: html,
      });

      return {};
    } catch (error) {
      throw CustomError.internalServer('Error al enviar el correo');
    }
  }

  static async sendLoginAccount({
    email,
    name,
    last_name,
    password,
  }: {
    email: string;
    name: string;
    last_name: string;
    password: string;
  }): Promise<{}> {
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

      const html = await this.getTemplate('loginAccount', {
        SYSTEM_NAME: SYSTEM_NAME,
        USER_NAME: name,
        USER_LAST_NAME: last_name,
        PASSWORD: password,
        VERIFICATION_URL: `${FRONTEND_URL}/auth`,
      });

      await transport.sendMail({
        from: `${SYSTEM_NAME} <gsgrou p@gmail.com>`,
        to: email,
        subject: `${SYSTEM_NAME} - Confirma tu cuenta`,
        text: 'Valida tu dirección email para acceder a tu cuenta por completo',
        html: html,
      });

      return {};
    } catch (error) {
      throw CustomError.internalServer('Error al enviar el correo');
    }
  }

  static async sendEmailRecoverPassword({
    email,
    name,
    last_name,
    token,
  }: {
    email: string;
    name: string;
    last_name: string;
    token: string;
  }): Promise<{}> {
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
      const html = await this.getTemplate('recoverPassword', {
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

      return {};
    } catch (error) {
      throw CustomError.internalServer('Error al enviar el correo');
    }
  }
}
