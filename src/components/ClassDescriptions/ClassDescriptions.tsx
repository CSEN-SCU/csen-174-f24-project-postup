import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Separator} from "@/components/ui/separator"
import {useState} from "react";
import {Course} from "@/app/utils/types";
import {getPrettyName} from "@/app/utils/helper";

interface ClassDescriptionsProps {
    course: Course;
}

export default function ClassDescriptions({course}: ClassDescriptionsProps) {
    const [isOpen, setIsOpen] = useState(false);

    var description = (course.description != "") ? course.description : "No description available";
    var prerequisite = (course.prerequisiteCourses != "") ? getPrettyName(course.prerequisiteCourses.join(", ")) : "None";
    var corequisite = (course.corequisiteCourses != "") ? getPrettyName(course.corequisiteCourses.join(", ")) : "None";

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
        <span className="cursor-pointer text-sm border-b-black">
          {course.name}
        </span>
            </DialogTrigger>
            <DialogContent className="max-w-5xl">
                <DialogHeader>
                    <DialogTitle>{course.name}</DialogTitle>
                    <DialogDescription>
                        {getPrettyName(course.id)} | {course.unit} Units
                    </DialogDescription>
                </DialogHeader>
                <div className="flex grow space-x-5">
                    <div>
                        <h4 className="font-bold mt-4">Class Description</h4>
                        <p className="items-center">{description}</p>
                    </div>
                    <Separator orientation="vertical"/>
                    <div className="flex-start space-x-50 space-y-1">
                        <div>
                            <h4 className="font-bold mt-4">Prerequisites</h4>
                            <p className="items-center">{prerequisite}</p>
                        </div>
                        <Separator orientation="horizontal"/>
                        <div>
                            <h4 className="font-bold mt-4">Corequisites</h4>
                            <p className="items-center">{corequisite}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    );
}
