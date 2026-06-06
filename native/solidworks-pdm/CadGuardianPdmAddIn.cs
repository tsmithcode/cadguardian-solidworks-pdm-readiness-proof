// Optional native example. Requires SOLIDWORKS PDM Professional API references and a configured vault.
using EPDM.Interop.epdm;

public sealed class CadGuardianPdmAddIn : IEdmAddIn5
{
    public void GetAddInInfo(ref EdmAddInInfo info, IEdmVault5 vault, IEdmCmdMgr5 commandManager)
    {
        info.mbsAddInName = "CAD Guardian PDM Readiness";
        info.mbsCompany = "CAD Guardian LLC";
        info.mlRequiredVersionMajor = 20;
        commandManager.AddCmd(1001, "CADG PDM Readiness Audit");
    }

    public void OnCmd(ref EdmCmd command, ref Array data)
    {
        if (command.meCmdType == EdmCmdType.EdmCmd_Menu)
        {
            // Read selected files, custom properties, BOM state, and lifecycle status here.
        }
    }
}
