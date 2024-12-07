import {DndContext, DragEndEvent} from "@dnd-kit/core";
import {Course, UserCourseData} from "@/app/utils/types";
import AddClass from "../AddClass/AddClass";
import AddClassTemplate from "../AddClass/AddClassTemplate";
import CourseCard from "./CourseCards";
import DroppableQuarter from "./DroppableQuarter";
import {DragDropCardProps} from "@/app/utils/interfaces";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

const DragDropCourses: React.FC<DragDropCardProps> = ({
    setSelectedQuarter,
    setUserPlan,
    userPlan,
    selectedQuarter,
    setAddingClass,
    isAddingClass,
    onSubmit,
    availableCourses,
}) => {
    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if (!over || !active.data.current) return;

        const {season: draggedSeason, year: draggedYear} = active.data
            .current as { season: string; year: string };
        const [targetSeason, targetYear] = (over.id as string).split("-");

        if (draggedSeason !== targetSeason || draggedYear !== targetYear) {
            const updatedQuarters = userPlan.map((quarter) => {
                if (quarter.season === draggedSeason && quarter.year === draggedYear) {
                    return {
                        ...quarter,
                        courses: quarter.courses
                            .filter((course): course is Course => course !== undefined)
                            .filter((course) => course.id !== active.data.current?.id),
                    };
                }
                if (quarter.season === targetSeason && quarter.year === targetYear) {
                    return {
                        ...quarter,
                        courses: [
                            ...quarter.courses.filter(
                                (course): course is Course => course !== undefined
                            ),
                            active.data.current as Course,
                        ],
                    };
                }
                return quarter;
            }) as UserCourseData[];

            setUserPlan(updatedQuarters);
        }
    };

    const handleRemoveClass = (
        courseId: string,
        season: string,
        year: string
    ) => {
        const updatedQuarters = userPlan.map((quarter) => {
            if (quarter.season === season && quarter.year === year) {
                return {
                    ...quarter,
                    courses: quarter.courses.filter((course) => course.id !== courseId),
                };
            }
            return quarter;
        });
        setUserPlan(updatedQuarters);
    };

    const renderCourseCards = (season: string, year: string) => {
        const quarterCourses =
            userPlan.find((q) => q.season === season && q.year === year)?.courses ||
            [];

        return quarterCourses.map((course) => (
            <CourseCard
                key={`${season}-${year}-${course.id}`}
                id={`${season}-${year}-${course.id}`}
                course={course}
                season={season}
                year={year}
                handleRemove={handleRemoveClass}
            />
        ));
    };

    const yearNames = ["First Year", "Second Year", "Third Year", "Fourth Year"];

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col gap-4 min-w-full max-w-full overflow-scroll">
                {/* Render Accordions */}
                {yearNames.map((yearName, yearIndex) => {
                    const startQuarter = yearIndex * 3; // Calculate starting quarter index
                    const endQuarter = startQuarter + 3; // Calculate ending quarter index

                    return (
                        <Accordion 
                            key={yearIndex} 
                            type="single" 
                            collapsible 
                            className="w-full border rounded-lg shadow-sm"
                        >
                            <AccordionItem 
                                value={`item-${yearIndex + 1}`} 
                                className="border-b last:border-b-0"
                            >
                                <AccordionTrigger 
                                    className="
                                        flex items-center justify-between 
                                        w-full p-4 text-left 
                                        bg-gray-50 hover:bg-gray-100 
                                        transition-colors duration-200 
                                        font-semibold text-lg 
                                        rounded-t-lg
                                        [&[data-state=open]>svg]:rotate-180
                                    "
                                >
                                    <span>{yearName}</span>
                                </AccordionTrigger>
                                <AccordionContent 
                                    className="
                                        p-4 bg-white 
                                        border-t border-gray-200 
                                        rounded-b-lg
                                    "
                                >
                                    <div className="grid grid-cols-3 gap-4">
                                        {userPlan
                                            .slice(startQuarter, endQuarter) // Slice the userPlan array
                                            .map(({season, year, courses}) => (
                                                <DroppableQuarter
                                                    key={`${season}-${year}`}
                                                    id={`${season}-${year}`}
                                                    season={season}
                                                    year={year}
                                                >
                                                    <div className="mb-2 text-sm text-gray-600">
                                                        {(() => {
                                                            const totalUnits = courses.reduce(
                                                                (acc, course) =>
                                                                    acc + (Number(course.unit) || 0),
                                                                0
                                                            );
                                                            return <h4>Total Units: {totalUnits}</h4>;
                                                        })()}
                                                    </div>
                                                    {renderCourseCards(season, year)}
                                                    {/* Add Class Button */}
                                                    {!(selectedQuarter[0] == season && selectedQuarter[1] == year) && (
                                                        <AddClass
                                                            setSelectedQuarter={setSelectedQuarter}
                                                            setAddingClass={setAddingClass}
                                                            season={season}
                                                            year={year}
                                                        />
                                                    )}
                                                    <div className="flex justify-center">
                                                        {/* Template Inputs */}
                                                        {isAddingClass &&
                                                            selectedQuarter[0] === season &&
                                                            selectedQuarter[1] === year && (
                                                                <AddClassTemplate
                                                                    onSubmit={onSubmit}
                                                                    availableCourses={availableCourses}
                                                                    userPlan={userPlan}
                                                                />
                                                            )}
                                                    </div>
                                                </DroppableQuarter>
                                            ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    );
                })}
            </div>
        </DndContext>
    );
};

export default DragDropCourses;
