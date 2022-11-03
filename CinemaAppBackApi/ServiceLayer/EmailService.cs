namespace ServiceLayer;
using DomainLayer.Repositories;
using ServicesAbstraction;
using Contracts;
using DomainLayer.Models;
using Mapster;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;

public class EmailService{

    public static void sendReservationEmail(Reservation reservation, string name){

        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse("cinefracinema@gmail.com"));
        email.To.Add(MailboxAddress.Parse(reservation.email));
        email.Subject = "Cinefra Ticket Booking Information";
        string k = "";
        foreach(ReservedSeat rs in reservation.reservedSeats){
            k += "[" + rs.rowColumnId + "]" + " ";
        }
        string text = "Your reservation has been successfull!<br/><br>Your reserved seat numbers are: " + k + ".<br/>" + "Total price payed: " + reservation.totalPrice + " rsd.<br/>";
        email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = "" +
            "<h2>Thank you for you purchase. Happy watching!</h2><p>" + text + "</p>" };
        
        using (var smtp = new SmtpClient()) {
            smtp.Connect("smtp.gmail.com", 587, false);
            smtp.Authenticate("cinefracinema@gmail.com", "xcqrblozlhgqreub");
            smtp.Send(email);
            smtp.Disconnect(true);
        }

    }

    public static void sendVerificationEmail(string userEmail, string token){

        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse("cinefracinema@gmail.com"));
        email.To.Add(MailboxAddress.Parse(userEmail));
        email.Subject = "Cinefra Account Verfication";
        string link = "http://localhost:5174/api/users/verify/" + userEmail + "/" + token;
        string anchortag = string.Format("<a href={0}>Confirm the registration.</a>", link);
        email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = "" +
            "<h2>Hello new user!</h2><p>We welcome you to the Cinefra cinema family, last thing you need to do to complete the registration process is confirm the registration.</p>" + anchortag };

        using (var smtp = new SmtpClient()) {
            smtp.Connect("smtp.gmail.com", 587, false);
            smtp.Authenticate("cinefracinema@gmail.com", "xcqrblozlhgqreub");
            smtp.Send(email);
            smtp.Disconnect(true);
        }

    }

    public static void sendPasswordResetMail(string userEmail, string token, string text){
    
        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse("cinefracinema@gmail.com"));
        email.To.Add(MailboxAddress.Parse(userEmail));
        email.Subject = "Cinefra Password Reset";
        string link = "http://localhost:3000/passwordreset?email=" + userEmail + "&token=" + token;
        string anchortag = string.Format("<a href={0}>Change the password.</a>", link);
        email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = "" +
            "<h2>Cinefra password reset!</h2><p>" + text + "</p>" + anchortag };

        using (var smtp = new SmtpClient()) {
            smtp.Connect("smtp.gmail.com", 587, false);
            smtp.Authenticate("cinefracinema@gmail.com", "xcqrblozlhgqreub");
            smtp.Send(email);
            smtp.Disconnect(true);
        }

    }

}