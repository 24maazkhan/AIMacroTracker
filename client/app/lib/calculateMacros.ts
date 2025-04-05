// app/lib/calculateMacros.ts

export type MacroInput = {
    calories: number;
    protein?: number;
    fat?: number;
    carbs?: number;
  };
  
  export type MacroOutput = {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  
  export function calculateMacros({ calories, protein = 0, fat = 0, carbs = 0 }: MacroInput): MacroOutput {
    if (!calories || calories <= 0) {
      throw new Error("Calories are required and must be greater than 0.");
    }
  
    const proteinKcal = protein * 4;
    const fatKcal = fat * 9;
    const carbsKcal = carbs * 4;
  
    const fixedCalories = proteinKcal + fatKcal + carbsKcal;
    let remainingCalories = calories - fixedCalories;
  
    let finalProtein = protein;
    let finalFat = fat;
    let finalCarbs = carbs;
  
    const provided = {
      protein: protein > 0,
      fat: fat > 0,
      carbs: carbs > 0,
    };
  
    if (remainingCalories > 0) {
      if (!provided.protein && !provided.fat && !provided.carbs) {
        // Only calories provided
        finalProtein += (remainingCalories * 0.4) / 4;
        finalFat += (remainingCalories * 0.2) / 9;
        finalCarbs += (remainingCalories * 0.4) / 4;
      } else if (provided.protein && !provided.fat && !provided.carbs) {
        // Calories + Protein
        finalFat += (remainingCalories * (20 / 60)) / 9;
        finalCarbs += (remainingCalories * (40 / 60)) / 4;
      } else if (!provided.protein && provided.fat && !provided.carbs) {
        // Calories + Fat
        finalProtein += (remainingCalories * (40 / 60)) / 4;
        finalCarbs += (remainingCalories * (20 / 60)) / 4;
      } else if (!provided.protein && !provided.fat && provided.carbs) {
        // Calories + Carbs
        finalProtein += (remainingCalories * (40 / 60)) / 4;
        finalFat += (remainingCalories * (20 / 60)) / 9;
      } else if (provided.protein && provided.fat && !provided.carbs) {
        // Calories + Protein + Fat
        finalCarbs += remainingCalories / 4;
      } else if (provided.protein && !provided.fat && provided.carbs) {
        // Calories + Protein + Carbs
        finalFat += remainingCalories / 9;
      } else if (!provided.protein && provided.fat && provided.carbs) {
        // Calories + Fat + Carbs
        finalProtein += remainingCalories / 4;
      }
      // else: all macros provided, no calculation needed.
    }
  
    return {
      calories,
      protein: Math.round(finalProtein),
      fat: Math.round(finalFat),
      carbs: Math.round(finalCarbs),
    };
  }
  