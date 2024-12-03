// script.js
document.getElementById('salaryForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const grossSalary = parseFloat(document.getElementById('grossSalary').value);

    const nationalTaxBrackets = [
        { limit: 18000, rate: 0 },
        { limit: 27000, rate: 0.065 },
        { limit: 45000, rate: 0.175 },
        { limit: Infinity, rate: 0.25 }
    ];

    const municipalTaxRate = 21.75;
    const socialSecurityRate = 7.65;
    const pensionContributionRate = 7.15;
    const unemploymentInsuranceRate = 1.5;

    let nationalTax = 0;
    for (let i = 0; i < nationalTaxBrackets.length; i++) {
        const { limit, rate } = nationalTaxBrackets[i];
        const previousLimit = i === 0 ? 0 : nationalTaxBrackets[i - 1].limit;
        if (grossSalary > previousLimit) {
            const taxableIncome = Math.min(grossSalary, limit) - previousLimit;
            nationalTax += taxableIncome * rate;
        }
    }

    const municipalTax = grossSalary * (municipalTaxRate / 100);
    const socialSecurityTax = grossSalary * (socialSecurityRate / 100);
    const pensionContribution = grossSalary * (pensionContributionRate / 100);
    const unemploymentInsurance = grossSalary * (unemploymentInsuranceRate / 100);

    const totalDeductions = nationalTax + municipalTax + socialSecurityTax + pensionContribution + unemploymentInsurance;
    const netSalary = grossSalary - totalDeductions;

    document.getElementById('grossSalaryResult').textContent = grossSalary.toFixed(2);
    document.getElementById('nationalTaxResult').textContent = nationalTax.toFixed(2);
    document.getElementById('municipalTaxResult').textContent = municipalTax.toFixed(2);
    document.getElementById('socialSecurityResult').textContent = socialSecurityTax.toFixed(2);
    document.getElementById('pensionResult').textContent = pensionContribution.toFixed(2);
    document.getElementById('unemploymentResult').textContent = unemploymentInsurance.toFixed(2);
    document.getElementById('totalDeductionsResult').textContent = totalDeductions.toFixed(2);
    document.getElementById('netSalaryResult').textContent = netSalary.toFixed(2);

    document.getElementById('results').classList.remove('hidden');
});
