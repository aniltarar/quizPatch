import {z} from 'zod';

export const registerScheme = z.object({
    email: z.string().email("Lütfen geçerli bir e-mail adresi giriniz."),
    displayName: z.string().min(3,"Lütfen en az 3 harfli bir isim giriniz.").max(25,"Lütfen 25 karakterden fazla girmeyiniz."),
    phoneNumber: z.string().min(11, "Lütfen 11 karakter giriniz.").max(11, "Lütfen 11 karakterden fazla girmeyiniz."),
    password: z.string().min(6,"En az 6 karakter olmalı").max(20,"En fazla 20 karakter olmalı"),
    passwordConfirmation: z.string("Parola tekrarınızı giriniz.").min(6,"Parola tekrarınızı kontrol ediniz."),
    role: z.string().min(1)
    });