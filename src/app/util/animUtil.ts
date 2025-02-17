

export const TextChangeDelay = 0.2;

export const TextInitialX = {
    visible: { 
        opacity: 1, 
        x: 0, 
        transition: {
            when: "beforeChildren",
            duration: 1.0,
            staggerChildren: 0.6
        }
    },
    hidden: { 
        opacity: 0, 
        x: -50, 
        transition: {
            when: "afterChildren"
        }
    }
}

export const TextInitialY = {
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: {
            when: "beforeChildren",
            duration: 1.0,
            staggerChildren: 0.6
        }
    },
    hidden: { 
        opacity: 0, 
        y: -50, 
        transition: {
            when: "afterChildren"
        }
    }
}

export const TextSwapFade = {
    out: {
        opacity: 0,
        transition: {
            duration: TextChangeDelay
        }
    },
    in: {
        opacity: 1,
        transition: {
            delay: TextChangeDelay
        }
    }
  }