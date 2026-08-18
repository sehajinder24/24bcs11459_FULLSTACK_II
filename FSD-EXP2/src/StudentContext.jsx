import {createContext,useContext} from "react";

const StudentContext = createContext();

const student = {
	name: "Lord Vader",
	email: "imperium@gmail.com",
	year: "3rd Year"
};


const student2 = {
	name: "Tighnari",
	email: "forestranger@gmail.com",
	year: "3rd Year"
};


const student3 = {
	name: "Tighnari",
	email: "forestranger@gmail.com",
	year: "3rd Year"
};

export function StudentProvider({children}){
	return(
	<StudentContext.Provider value = {student}>
		{children}
	</StudentContext.Provider>
	)
}

export function useUser(){
	return useContext(StudentContext);
}

