export enum HxIntrayDevSectionUpdateUrlParam {
	id = "id",
	sectionType = "section_type",
}

interface TBaseProps {
    id: number;
    title: string;
    content: string;
}

export interface HxIntrayDevSectionUpdateIntroDev extends TBaseProps {}
export interface HxIntrayDevSectionUpdateOutroDev extends TBaseProps {}
export interface HxIntrayDevSectionUpdateTask1 extends TBaseProps {
    label_1: string;
    label_2: string;
    label_3: string;
}
export interface HxIntrayDevSectionUpdateTask2 extends TBaseProps {
    label_1: string;
    label_2: string;
    label_3: string;
    label_4: string;
}
export interface HxIntrayDevSectionUpdateTask3 extends TBaseProps {
    label_1: string;
    label_2: string;
    label_3: string;
}
export interface HxIntrayDevSectionUpdateTask4 extends TBaseProps {
    label_1: string;
    label_2: string;
    label_3: string;
    label_4: string;
}
export interface HxIntrayDevSectionUpdateTask5 extends TBaseProps {
    label_1: string;
}