import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface IMailContact {
    name: string;
    email: string;
}

interface ITemplateVariable {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariable;
}

interface ISendEmail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

export default class EtherealMail {
    static async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendEmail): Promise<void> {
        const account = await nodemailer.createTestAccount();

        const handlebarsMailTemplate = new HandlebarsMailTemplate();

        const transport = await nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });

        const message = await transport.sendMail({
            from: {
                name: from?.name || 'Equipe Api Vendas',
                address: from?.email || 'equiepe@apivendas.com.br',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await handlebarsMailTemplate.parse(templateData),
        });

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}
