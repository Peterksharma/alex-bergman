import { trustCardData } from "@/data/homeTrustCards"
import { renderTrustCards } from "@/lib/renderHomeTrustCards"

export default function Trust() {

    return (
      <div>
        <div className="w-full h-[35vh] bg-gray-100 flex items-center p-3">
            <div className='flex w-full gap-2 justify-center'>
                {renderTrustCards(trustCardData)}
            </div>
      </div>
        </div>
    )
}