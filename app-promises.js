const users = [{
    id: 1,
    name: 'Gamal',
    schoolId: 101
}, {
    id: 2,
    name: 'Linda',
    schoolId: 150
}, {
    id: 3,
    name: 'Jemi',
    schoolId: 295
}]

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 86
}, {
    id: 2,
    schoolId: 150,
    grade: 86
}, {
    id: 3,
    schoolId: 101,
    grade: 80
}]

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id)

        if (user) {
            resolve(user)
        } else {
            reject(`Unable to find user with id of ${id}`)
        }
    })
}

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId))
    })
}

const getStatus = (userId) => {
    var user;
    return getUser(userId).then((tempUser) => {
        user = tempUser
        return getGrades(user.schoolId)
    }).then((grades) => {
        let average = 0

        if (grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length
        }

        return `${user.name} has a ${average}% in the class`
        console.log(average)
    })
}



//----------------------------------------------------------

// () => {
//     return new Promise((resolve, reject) => {
//         resolve('Gamal')
//     })
// }


// async await
// const getStatusAlt = async (userId) => {
//     throw new Error('This is an error')    
//     return 'Gamal'
// }
const getStatusAlt = async (userId) => {
    const user = await getUser(userId)
    const grades = await getGrades(user.schoolId)

    let average = 0

    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length
    }
    else{
        average ='Apsence'
    }

    return `${user.name} has a ${average}% in the class`
    console.log(average)  
}

getStatusAlt(2).then((status) => {
    console.log(status)
}).catch((e) => {
    console.log(e)
})
// getStatus(123).then((user) => {
//     console.log(user)
// }).catch((e) => {
//     console.log(e)
// })