import { trustCardData } from "@/data/homeTrustCards"
import { renderTrustCards } from "@/lib/renderHomeTrustCards"

export default function Trust() {

    return (
      <div>
        <div className="w-full h-[40vh] bg-gray-100 flex items-center">
            <div className='flex w-full gap-2 justify-center pl-16 pr-16'>
                {renderTrustCards(trustCardData)}
            </div>
      </div>
        </div>
    )
}