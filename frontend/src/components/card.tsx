import { isPast, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { getInitials } from '@/utils/getInitials'

type CardProps = {
  title: string
  date?: string
  ownerName?: string
}

export function Card({ title, date, ownerName }: CardProps) {
  const dateIsPast = date && isPast(new Date(date))
  const dateColor = dateIsPast
    ? 'bg-red-300 text-red-950'
    : 'bg-green-300 text-green-950'

  return (
    <div className="bg-white p-3 rounded-sm">
      <p className="text-blue-950 text-sm">{title}</p>
      <div className="flex justify-between mt-2">
        <div>
          {date && (
            <div
              className={`${dateColor} font-medium flex justify-center items-center text-xs rounded-sm	p-2`}
            >
              {format(new Date(date), `d 'de' MMM`, { locale: ptBR })}
            </div>
          )}
        </div>

        {ownerName && (
          <div className="bg-blue-400 text-blue-950 w-8 h-8 rounded-full flex justify-center items-center text-sm font-medium">
            {getInitials(ownerName)}
          </div>
        )}
      </div>
    </div>
  )
}
