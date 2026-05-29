import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Webhook implementation here
    console.log('Webhook MP recebido:', body)

    // TODO: Update order status in Supabase based on MP status
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro no webhook:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
