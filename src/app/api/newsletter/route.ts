import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Alamat email tidak valid.' },
        { status: 400 }
      );
    }

    // Simulasi penyimpanan database/panggilan ke penyedia eksternal (Mailchimp, ConvertKit, dsb.)
    console.log(`[Newsletter Subscription] Pelanggan baru terdaftar: ${email}`);

    // Meniru delay jaringan riil demi kebaikan UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      message: 'Pendaftaran berhasil! Terima kasih telah berlangganan.',
    });
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan internal pada server.' },
      { status: 500 }
    );
  }
}
