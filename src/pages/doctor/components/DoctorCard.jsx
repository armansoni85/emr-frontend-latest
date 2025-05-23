import { CardComponent, SquareAvatar } from "@src/components";

const DoctorCard = () => {
    return (
        <CardComponent className="pe-12 col-span-2">
            <div className="flex gap-3">
                <div className="relative">
                    <SquareAvatar src={"/assets/images/johnson.png"} />
                    <div className="absolute cursor-pointer bg-white h-5 w-5 right-1 bottom-2 text-center rounded-full">
                        <i className="material-icons text-gray-500 text-sm cursor-pointer">edit</i>
                    </div>
                </div>
                <div className="text-start">
                    <h6 className="text-2xl text-darkBlue font-medium">Jennifer Perry</h6>
                    <div className="flex gap-1 ">
                        <span>Doctor ID :</span>
                        <span className="text-muted">#111111</span>
                    </div>
                    <div className="flex gap-1 ">
                        <span>Department :</span>
                        <span className="text-muted">Cardiology</span>
                    </div>
                </div>
            </div>
        </CardComponent>
    );
};

export default DoctorCard;
