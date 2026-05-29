import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, total } = body

    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '' })
    const preference = new Preference(client)

    const response = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: item.product.id,
          title: item.product.name,
          quantity: item.qty,
          unit_price: item.product.price,
          currency_id: 'BRL',
        })),
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/carrinho?status=success`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/carrinho?status=failure`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/carrinho?status=pending`,
        },
        auto_return: 'approved',
      }
    })

    return NextResponse.json({ init_point: response.init_point })
  } catch (error) {
    console.error('Error creating preference:', error)
    return NextResponse.json({ error: 'Erro ao gerar checkout' }, { status: 500 })
  }
}
