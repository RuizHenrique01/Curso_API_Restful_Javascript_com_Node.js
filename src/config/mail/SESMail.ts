import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';
import aws from 'aws-sdk';
import mailConfig from '@config/mail/mail';

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

export default class SESMail {
    static async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendEmail): Promise<void> {
        const handlebarsMailTemplate = new HandlebarsMailTemplate();

        const transport = await nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01',
            }),
        });

        const { email, name } = mailConfig.defaults.from;

        const message = await transport.sendMail({
            from: {
                name: from?.name || name,
                address: from?.email || email,
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await handlebarsMailTemplate.parse(templateData),
        });
    }
}
