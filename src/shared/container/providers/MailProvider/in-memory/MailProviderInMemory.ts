import IMailProvider from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
  private massages: any[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.massages.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export default MailProviderInMemory;
