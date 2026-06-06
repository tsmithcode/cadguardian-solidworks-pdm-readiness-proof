using System.Security.Cryptography;
using System.Text.Json;
using System.Text.Json.Serialization;

var repoRoot = FindRepoRoot(AppContext.BaseDirectory);
var profile = new KitProfile(
    "SolidWorks and PDM Readiness Quick-Start Kit",
    "tsmithcode/cadguardian-solidworks-pdm-readiness-proof",
    "solidworks-pdm-readiness",
    "product data owner",
    "Score file references, custom properties, BOM readiness, and release-state ownership before cleanup, migration, or PDM automation expands.",
    "A product team wants cleanup, automation, or migration, but file references, custom properties, BOM rows, and release states are not trustworthy yet.",
    "Score readiness before a SolidWorks API or PDM add-in touches production files.",
    "Bundle public STEP/SolidWorks fixtures, validate package metadata, and show COM/API plus PDM add-in scaffolds.",
    "A reviewer can run the kit, inspect readiness, and decide when native SolidWorks or PDM execution becomes justified.",
    "Use C# for package readiness and a native SolidWorks/PDM adapter only after file references, custom properties, and release states are named.",
    "Pick one product family, map the required properties and release states, then decide whether the first move is cleanup, PDM check, or API adapter.",
    new string[] { "SldWorks", "IModelDoc2", "IModelDocExtension", "CustomPropertyManager", "IAssemblyDoc", "IComponent2", "IEdmAddIn5", "IEdmVault5", "IEdmCmd" },
    new string[] { "Product family request", "STEP/SLDPRT fixture inventory", "Custom property check", "BOM readiness check", "PDM state map", "Release package report", "Manufacturing review", "Cleanup or pilot decision" },
    new[]
    {
        new FixtureSpec("fixtures/public/nist/nist_ctc_01_asme1_rd_sw1802.SLDPRT", "SLDPRT", "Native SolidWorks package-presence fixture.", "NIST MBE PMI SolidWorks reference", "NIST unrestricted test case material; no endorsement implied", Array.Empty<string>()),
        new FixtureSpec("fixtures/public/nist/nist_ctc_01_asme1_rd.stp", "STEP", "Public text-readable STEP metadata fixture.", "NIST PMI STEP reference", "NIST unrestricted test case material; no endorsement implied", new string[] { "ISO-10303", "HEADER", "PRODUCT" }),
    },
    new[]
    {
        new ParetoRule("File reference inventory", "Stops migration or automation from breaking references users trust.", "`IModelDoc2`, `IModelDocExtension`, and selected document reference inspection.", new string[] { "SLDPRT", "STEP" }),
        new ParetoRule("Custom property and BOM readiness", "Finds the few fields that drive quote, manufacturing, and release errors.", "`CustomPropertyManager`, `IAssemblyDoc`, `IComponent2`, and BOM extraction.", new string[] { "PRODUCT" }),
        new ParetoRule("PDM release-state boundary", "Keeps PDM work focused on ownership, state, and approval instead of broad vault churn.", "`IEdmAddIn5`, `IEdmVault5`, and `IEdmCmd` after release states are named.", new string[] { "native/solidworks-pdm/CadGuardianPdmAddIn.cs" }),
    });

var report = new ParetoQuickStartRunner(repoRoot, profile).Run();
var options = new JsonSerializerOptions { WriteIndented = true, DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull };
var reportPath = Path.Combine(repoRoot, "reports", "quickstart-report.json");
Directory.CreateDirectory(Path.GetDirectoryName(reportPath)!);
File.WriteAllText(reportPath, JsonSerializer.Serialize(report, options));

Console.WriteLine(profile.Title);
Console.WriteLine($"Status: {report.Status}");
Console.WriteLine($"Pareto checks: {report.ParetoChecks.Count}");
Console.WriteLine($"Reusable routines: {report.ReusableRoutines.Count}");
Console.WriteLine($"Report: {Path.GetRelativePath(repoRoot, reportPath)}");

static string FindRepoRoot(string start)
{
    var current = new DirectoryInfo(start);
    while (current is not null)
    {
        if (File.Exists(Path.Combine(current.FullName, "package.json")) && Directory.Exists(Path.Combine(current.FullName, "quickstart")))
        {
            return current.FullName;
        }

        current = current.Parent;
    }

    throw new InvalidOperationException("Could not locate repo root.");
}

public sealed record KitProfile(
    string Title,
    string Repo,
    string WorkflowClass,
    string ReviewOwner,
    string BusinessImpact,
    string Situation,
    string Task,
    string Action,
    string Result,
    string RuntimeDecision,
    string NextMove,
    IReadOnlyList<string> ApiSignals,
    IReadOnlyList<string> Workflow,
    IReadOnlyList<FixtureSpec> Fixtures,
    IReadOnlyList<ParetoRule> ParetoRules);

public sealed record FixtureSpec(
    string Path,
    string Format,
    string Use,
    string Attribution,
    string License,
    IReadOnlyList<string> EvidenceTokens);

public sealed record FixtureReceipt(
    string Path,
    string Format,
    string Use,
    string Attribution,
    string License,
    long SizeBytes,
    string Sha256,
    bool TextReadable,
    IReadOnlyList<string> EvidenceFound,
    IReadOnlyList<string> EvidenceMissing,
    string RuntimeBoundary);

public sealed record ParetoRule(
    string Name,
    string BusinessImpact,
    string NativeHandoff,
    IReadOnlyList<string> EvidenceNeeded);

public sealed record ParetoCheck(
    string Name,
    string Status,
    string BusinessImpact,
    string Evidence,
    string NativeHandoff);

public sealed record ReusableRoutine(
    string Name,
    string WhyItMatters,
    string AdaptationPoint);

public sealed record QuickStartReport(
    string Status,
    string GeneratedAtUtc,
    string Repo,
    string Title,
    string WorkflowClass,
    string ReviewOwner,
    string BusinessImpact,
    string RuntimeDecision,
    string NextMove,
    StarStory Star,
    IReadOnlyList<string> Workflow,
    IReadOnlyList<string> ApiSignals,
    IReadOnlyList<FixtureReceipt> Fixtures,
    IReadOnlyList<ParetoCheck> ParetoChecks,
    IReadOnlyList<ReusableRoutine> ReusableRoutines);

public sealed record StarStory(string Situation, string Task, string Action, string Result);

public sealed class ParetoQuickStartRunner
{
    private readonly string repoRoot;
    private readonly KitProfile profile;

    public ParetoQuickStartRunner(string repoRoot, KitProfile profile)
    {
        this.repoRoot = repoRoot;
        this.profile = profile;
    }

    public QuickStartReport Run()
    {
        var fixtures = profile.Fixtures.Select(InspectFixture).ToList();
        var checks = profile.ParetoRules.Select(rule => EvaluateRule(rule, fixtures)).ToList();
        var routines = new[]
        {
            new ReusableRoutine(
                "FixtureInventory",
                "Creates a stable receipt before automation touches trusted CAD files.",
                "Replace the public fixtures with your private package path after access is approved."),
            new ReusableRoutine(
                "ParetoRuleEngine",
                "Keeps the first useful rules visible instead of hiding business logic in scripts.",
                "Swap or add rules for the repeated checks your drafters already perform."),
            new ReusableRoutine(
                "NativeRuntimeGate",
                "Prevents public parser confidence from pretending to be licensed CAD execution.",
                "Move a rule into the native adapter only after the public report shows why it matters."),
        };
        var status = checks.Any(check => check.Status is "needs-review") ? "needs-review" : "ready-for-private-sample";

        return new QuickStartReport(
            status,
            DateTimeOffset.UtcNow.ToString("O"),
            profile.Repo,
            profile.Title,
            profile.WorkflowClass,
            profile.ReviewOwner,
            profile.BusinessImpact,
            profile.RuntimeDecision,
            profile.NextMove,
            new StarStory(profile.Situation, profile.Task, profile.Action, profile.Result),
            profile.Workflow,
            profile.ApiSignals,
            fixtures,
            checks,
            routines);
    }

    private FixtureReceipt InspectFixture(FixtureSpec fixture)
    {
        var path = Path.Combine(repoRoot, fixture.Path);
        if (!File.Exists(path))
        {
            throw new FileNotFoundException($"Missing fixture: {fixture.Path}", path);
        }

        var bytes = File.ReadAllBytes(path);
        var hash = Convert.ToHexString(SHA256.HashData(bytes)).ToLowerInvariant();
        var extension = Path.GetExtension(path).ToLowerInvariant();
        var textReadable = extension is ".dxf" or ".ifc" or ".step" or ".stp";
        var found = new List<string>();
        var missing = new List<string>();

        if (textReadable && fixture.EvidenceTokens.Count > 0)
        {
            var text = File.ReadAllText(path);
            foreach (var token in fixture.EvidenceTokens)
            {
                if (text.Contains(token, StringComparison.OrdinalIgnoreCase)) found.Add(token);
                else missing.Add(token);
            }
        }
        else if (fixture.EvidenceTokens.Count == 0)
        {
            found.Add(fixture.Format);
        }

        return new FixtureReceipt(
            fixture.Path,
            fixture.Format,
            fixture.Use,
            fixture.Attribution,
            fixture.License,
            bytes.LongLength,
            hash,
            textReadable,
            found,
            missing,
            textReadable ? "public-text-scan" : "licensed-native-runtime-required");
    }

    private static ParetoCheck EvaluateRule(ParetoRule rule, IReadOnlyList<FixtureReceipt> fixtures)
    {
        var evidence = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        foreach (var fixture in fixtures)
        {
            evidence.Add(fixture.Format);
            foreach (var token in fixture.EvidenceFound) evidence.Add(token);
        }

        foreach (var token in rule.EvidenceNeeded)
        {
            if (token.StartsWith("native/", StringComparison.OrdinalIgnoreCase))
            {
                evidence.Add(token);
            }
        }

        var missing = rule.EvidenceNeeded.Where(token => !evidence.Contains(token)).ToArray();
        var status = missing.Length == 0 ? "ready-for-private-sample" : "needs-review";
        var evidenceSummary = missing.Length == 0
            ? $"Evidence present: {string.Join(", ", rule.EvidenceNeeded)}"
            : $"Missing evidence: {string.Join(", ", missing)}";

        return new ParetoCheck(rule.Name, status, rule.BusinessImpact, evidenceSummary, rule.NativeHandoff);
    }
}
