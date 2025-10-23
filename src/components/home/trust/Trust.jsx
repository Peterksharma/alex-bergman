import { trustCardData } from "@/data/homeTrustCards"
import { renderTrustCards } from "@/lib/renderHomeTrustCards"

export default function Trust() {

    return (
      <div>
        <div className="w-full  bg-gray-900 flex items-center py-16">
            <div className='flex w-full gap-2 justify-center pl-16 pr-16'>
                {renderTrustCards(trustCardData)}
            </div>
      </div>
        </div>
    )
}